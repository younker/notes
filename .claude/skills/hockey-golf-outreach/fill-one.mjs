// Single-business runner for the paste-and-go flow. Reads the first target in
// queue.json, opens a headed Chromium window, clicks "Send Email", fills the
// contact form + message, scrolls the reCAPTCHA into view, then waits for the
// human to submit. No terminal interaction — exits once the form is submitted
// (page navigates) or the tab/window is closed.
//
// Usage: node fill-one.mjs [queue.json]

import { chromium } from 'playwright';
import { readFileSync, appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const cfg = JSON.parse(readFileSync(join(here, 'config.json'), 'utf8'));
const queuePath = process.argv[2] || join(here, 'queue.json');
const queue = JSON.parse(readFileSync(queuePath, 'utf8'));
const t = (queue.targets || [])[0];
if (!t) { console.error('No target in', queuePath); process.exit(1); }

const ctx = await chromium.launchPersistentContext(join(here, '.profile'), {
  headless: false,
  viewport: null,
  args: ['--start-maximized'],
});

const page = ctx.pages()[0] || (await ctx.newPage());
console.log('Opening:', t.name || t.url);

try {
  await page.goto(t.url, { waitUntil: 'load' });
  await page.waitForSelector(cfg.memberLinkSelector, { state: 'visible', timeout: 15000 });

  // The "Send Email" link submits a hidden form via a JS handler; if we click
  // before the handler is bound, nothing opens. Retry until the popup appears.
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
  await form.fill('[name="Subject"]', t.subject || queue.subject || cfg.subject);
  await form.fill('[name="Message"]', t.message || '');
  await form.locator('iframe[src*="recaptcha"]').first().scrollIntoViewIfNeeded().catch(() => {});

  console.log('READY: solve the reCAPTCHA, proofread, click Submit.');

  await new Promise((res) => {
    const done = (why) => { cleanup(); res(why); };
    const onNav = (f) => { if (f === form.mainFrame()) done('submitted'); };
    const onClose = () => done('closed');
    const cleanup = () => { form.off('framenavigated', onNav); form.off('close', onClose); ctx.off('close', onCtx); };
    const onCtx = () => done('window-closed');
    form.on('framenavigated', onNav);
    form.on('close', onClose);
    ctx.on('close', onCtx);
  });

  appendFileSync(join(here, 'outcomes.log'), `${t.name || t.url}\tsubmitted-or-closed\n`);
  console.log('Done.');
} catch (err) {
  console.error('ERROR:', err.message);
  appendFileSync(join(here, 'outcomes.log'), `${t.name || t.url}\terror: ${err.message}\n`);
} finally {
  await ctx.close().catch(() => {});
}
