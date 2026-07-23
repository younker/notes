// Build queue.json from a list of targets using the standard email body.
// Only the check memo varies per business (business name). Greeting is "Hello,".
//
// Usage: node gen-queue.mjs targets.json [out.json]
//   targets.json: [{ "url": "...", "name": "Business", "type": "..." }, ...]

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const cfg = JSON.parse(readFileSync(join(here, 'config.json'), 'utf8'));
const targetsPath = process.argv[2];
const outPath = process.argv[3] || join(here, 'queue.json');
if (!targetsPath) { console.error('usage: node gen-queue.mjs targets.json [out.json]'); process.exit(1); }
const targets = JSON.parse(readFileSync(targetsPath, 'utf8'));

const body = (business) => `Hello,

My name is Jason Younker, and I'm the proud parent of a Traverse City North Stars 14U AA hockey player. We're holding our annual golf fundraiser on August 16, 2026, at Grand Traverse Resort, and I'm reaching out to local businesses about sponsorship.

This is our team's biggest fundraiser of the year. It helps cover ice time, league fees, tournaments, and travel so those costs don't fall entirely on our families.

The easiest way to learn about the event, sponsor a level, register to golf, or make a donation is here:

    ${cfg.fundraiserUrl}

Sponsorship levels include:

- General - $250: Hole or tee sign
- Hat-Trick - $500: Event hole signage
- Playmaker - $1,000: Primary contest signage
- Stanley Cup - $2,000: Golf and lunch for a foursome plus primary contest signage

To be included on event signage, sponsorships need to be confirmed by August 3, 2026.

Grand Traverse Hockey Association is a 501(c)(3) (EIN 38-3347536), so sponsorships are tax-deductible.

If you'd rather donate by check, Venmo, or contribute gift cards or products for our prize tables, just let me know and I'll send the details.

Thank you for considering supporting these young men and their families.

Jason Younker
TC North Stars 14U AA Travel Hockey
206-795-4418 | jason@ynkr.org`;

// memo uses a trimmed business name (drop trailing LLC/Inc for cleaner memos)
const memoName = (n) => n.replace(/,?\s+(LLC|L\.L\.C\.|Inc\.?|Corporation|Co\.?)$/i, '').trim();

const queue = {
  subject: cfg.subject,
  targets: targets.map((t) => ({ url: t.url, name: t.name, type: t.type || '', message: body(memoName(t.name)) })),
};
writeFileSync(outPath, JSON.stringify(queue, null, 2));
console.log(`wrote ${queue.targets.length} targets -> ${outPath}`);
