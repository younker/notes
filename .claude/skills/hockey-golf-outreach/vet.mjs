// Vet member listings: fetch each page and report city + whether it has an email
// contact link. Used to filter candidates to Traverse City only (project rule)
// and drop listings with no "Send Email".
//
// Usage:
//   node vet.mjs slug-1 slug-2 ...
//   node vet.mjs --file slugs.txt      (one slug or member URL per line)
//
// Output (tab-separated): OK|SKIP  city  email=0|1  slug
// OK = Traverse City AND has email; SKIP = anything else (with reason).

const base = 'https://business.traverseconnect.com/list/member/';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36';

let slugs = [];
if (process.argv[2] === '--file') {
  const { readFileSync } = await import('node:fs');
  slugs = readFileSync(process.argv[3], 'utf8').split('\n').map((s) => s.trim()).filter(Boolean);
} else {
  slugs = process.argv.slice(2);
}
slugs = slugs.map((s) => s.replace(/^.*\/list\/member\//, '').replace(/\/.*$/, ''));

for (const slug of slugs) {
  try {
    const res = await fetch(base + slug, { headers: { 'User-Agent': UA } });
    const html = await res.text();
    const city = (html.match(/itemprop="addressLocality">([^<]+)/) || [])[1]?.trim() || '(unknown)';
    const hasEmail = /itemprop="email"/.test(html) ? 1 : 0;
    const inTC = /^Traverse City$/i.test(city);
    const verdict = inTC && hasEmail ? 'OK  ' : 'SKIP';
    const reason = !inTC ? `not-TC(${city})` : !hasEmail ? 'no-email' : '';
    console.log(`${verdict}\t${city}\temail=${hasEmail}\t${slug}\t${reason}`);
  } catch (err) {
    console.log(`SKIP\t(error)\temail=?\t${slug}\t${err.message}`);
  }
}
