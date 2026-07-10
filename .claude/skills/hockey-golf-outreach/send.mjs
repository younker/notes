// Drives the Traverse Connect member contact form for the TC North Stars golf
// fundraiser. For each business in the queue it opens the member page, clicks
// "Send Email", fills the contact form + customized message, then STOPS so a
// human can solve the reCAPTCHA, proofread, and click Submit. Advances to the
// next business automatically when the form is submitted, or on Enter to skip.
//
// Usage: node send.mjs [queue.json]   (default queue: ./queue.json)

import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { appendFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const cfg = JSON.parse(readFileSync(join(here, 'config.json'), 'utf8'));
const queuePath = process.argv[2] || join(here, 'queue.json');
const queue = JSON.parse(readFileSync(queuePath, 'utf8'));
const targets = queue.targets || [];
const subject = queue.subject || cfg.subject;
const outLog = join(here, 'outcomes.log');

if (!targets.length) {
  console.error('No targets in', queuePath);
  process.exit(1);
}

// Enter-to-skip only works with an interactive terminal. When run in the
// background (no TTY), skip readline entirely and advance purely on submit.
const interactive = process.stdin.isTTY;
const rl = interactive ? createInterface({ input: process.stdin, output: process.stdout }) : null;
const waitEnter = (prompt) =>
  interactive ? new Promise((res) => rl.question(prompt, () => res('enter'))) : new Promise(() => {});

const banner = (s) => console.log('\n' + '='.repeat(64) + '\n' + s + '\n' + '='.repeat(64));

// Persistent profile so the browser (and any reCAPTCHA trust) stays warm across
// the whole batch and future runs.
const ctx = await chromium.launchPersistentContext(join(here, '.profile'), {
  headless: false,
  viewport: null,
  args: ['--start-maximized'],
});

let sent = 0, skipped = 0;

for (let i = 0; i < targets.length; i++) {
  const t = targets[i];
  banner(`(${i + 1}/${targets.length})  ${t.name || t.url}`);
  const page = ctx.pages()[0] || (await ctx.newPage());

  try {
    await page.goto(t.url, { waitUntil: 'load' });
    await page.waitForSelector(cfg.memberLinkSelector, { state: 'visible', timeout: 15000 });
    let form;
    for (let attempt = 0; attempt < 4 && !form; attempt++) {
      const [popup] = await Promise.all([
        ctx.waitForEvent('page', { timeout: 6000 }).catch(() => null),
        page.click(cfg.memberLinkSelector).catch(() => {}),
      ]);
      if (popup) form = popup;
      else await page.waitForTimeout(1000);
    }
    if (!form) throw new Error('Send Email did not open a contact form (no email on file?)');
    await form.waitForLoadState('domcontentloaded');
    await form.waitForSelector('[name="Message"]', { timeout: 15000 });

    for (const [name, val] of Object.entries(cfg.sender)) {
      if (name === 'ContactPreference' || name === 'carbonCopy') continue;
      const loc = form.locator(`[name="${name}"]`);
      if (await loc.count()) await loc.first().fill(String(val));
    }
    if (cfg.sender.ContactPreference) {
      await form.selectOption('[name="ContactPreference"]', cfg.sender.ContactPreference).catch(() => {});
    }
    if (cfg.sender.carbonCopy && (await form.locator('[name="CarbonCopy"]').count())) {
      await form.check('[name="CarbonCopy"]').catch(() => {});
    }
    await form.fill('[name="Subject"]', t.subject || subject);
    await form.fill('[name="Message"]', t.message || '');

    // Bring the reCAPTCHA into view and hand off to the human.
    await form.locator('iframe[src*="recaptcha"]').first().scrollIntoViewIfNeeded().catch(() => {});
    console.log('READY. In the browser: solve the reCAPTCHA, proofread, click Submit.');
    console.log('   -> auto-advances when you submit. Press Enter here to SKIP this one.');

    // "Submitted" = the form page navigates (POST result) or the tab closes.
    let resolved = 'submitted';
    const submitted = new Promise((res) => {
      const onNav = (f) => { if (f === form.mainFrame()) { cleanup(); res('submitted'); } };
      const onClose = () => { cleanup(); res('submitted'); };
      const cleanup = () => { form.off('framenavigated', onNav); form.off('close', onClose); };
      form.on('framenavigated', onNav);
      form.on('close', onClose);
    });
    const outcome = await Promise.race([submitted.then(() => 'submitted'), waitEnter('')]);

    if (outcome === 'enter') { resolved = 'skipped'; skipped++; }
    else { sent++; }

    appendFileSync(outLog, `${t.name || t.url}\t${resolved}\n`);
    console.log(`   ${resolved.toUpperCase()}`);
    if (!form.isClosed()) await form.close().catch(() => {});
  } catch (err) {
    console.error('   ERROR:', err.message, '-> skipping to next');
    appendFileSync(outLog, `${t.name || t.url}\terror: ${err.message}\n`);
    if (interactive) await waitEnter('   Press Enter to continue to the next business (Ctrl-C to quit)... ');
  }
}

banner(`DONE.  submitted/left-open: ${sent}   skipped: ${skipped}   (log: outcomes.log)`);
if (rl) rl.close();
await ctx.close();
