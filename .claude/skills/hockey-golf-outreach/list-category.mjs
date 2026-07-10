import { chromium } from 'playwright';
const url = process.argv[2];
const b = await chromium.launch({ headless: true });
const p = await b.newPage();
await p.goto(url, { waitUntil: 'networkidle' });
// scroll to trigger any lazy loading
for (let i=0;i<5;i++){ await p.mouse.wheel(0,3000); await p.waitForTimeout(400); }
const items = await p.evaluate(() => {
  const seen = new Map();
  document.querySelectorAll('a[href*="/list/member/"]').forEach(a => {
    const href = a.href.split('#')[0].split('?')[0];
    const name = (a.innerText||'').trim();
    if (!seen.has(href)) seen.set(href, name);
    else if (name && !seen.get(href)) seen.set(href, name);
  });
  return [...seen.entries()].map(([url,name])=>({name,url}));
});
console.log('COUNT', items.length);
console.log(JSON.stringify(items, null, 0));
await b.close();
