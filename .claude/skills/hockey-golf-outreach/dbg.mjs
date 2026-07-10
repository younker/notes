import { chromium } from 'playwright';
const b = await chromium.launch({ headless: true });
const p = await b.newPage();
await p.goto('https://business.traverseconnect.com/list/member/dave-s-garage-inc-4500', { waitUntil: 'load' });
const info = await p.evaluate(() => {
  const els = [...document.querySelectorAll('#gz-directory-contactmember')];
  return els.map(e => { const s=getComputedStyle(e); const r=e.getBoundingClientRect();
    return { display:s.display, vis:s.visibility, w:r.width, h:r.height,
      parentDisplay: getComputedStyle(e.closest('li')||e.parentElement).display,
      html: e.outerHTML.slice(0,120) }; });
});
console.log(JSON.stringify(info,null,1));
await b.close();
