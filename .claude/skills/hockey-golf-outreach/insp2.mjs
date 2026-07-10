import { chromium } from 'playwright';
const b = await chromium.launch({ headless: true });
const ctx = await b.newContext();
const p = await ctx.newPage();
await p.goto('https://business.traverseconnect.com/list/member/gosling-czubak-engineering-sciences-inc-423', { waitUntil: 'load' });
const [f] = await Promise.all([ ctx.waitForEvent('page'), p.click('#gz-directory-contactmember') ]);
await f.waitForLoadState('load');
await f.waitForTimeout(2500);
const info = await f.evaluate(() => [...document.querySelectorAll('iframe[title="reCAPTCHA"]')].map((i,idx) => {
  const r=i.getBoundingClientRect(); const s=getComputedStyle(i);
  const form = i.closest('form');
  return { idx, w:Math.round(r.width), h:Math.round(r.height), display:s.display, visibility:s.visibility,
    formId: form?.id||'(none)', inContactForm: !!(form && form.id==='gz-directory-contactform') };
}));
console.log(JSON.stringify(info, null, 1));
await b.close();
