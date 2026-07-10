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

My name is Jason Younker, and I'm the proud parent of a Traverse City North Stars 14U AA hockey player. We are holding our annual golf fundraiser on August 16, 2026 at the Grand Traverse Resort and I'm reaching out to local businesses about sponsorship.

This is the team's biggest fundraiser of the year and helps cover ice time, league fees, tournament entries, and travel so those costs don't fall entirely on our families.

There are several ways you can support our local hockey program. The first would simply be to come out and play some golf with us! It is $150 per person and we organize in groups of 4. We use a shotgun start at 9am, which gives you a full day of golf, opportunities to win additional prizes and all money goes directly to supporting these young men.

Then second way would be to sponsor the team at whatever level fits:

  General     -   $250: hole or tee signage
  Hat-Trick   -   $500: event hole signage
  Playmaker   - $1,000: primary contest signage
  Stanley Cup - $2,000: golf + lunch for a foursome, plus primary contest signage

With this sponsorship comes various signage opportunities at the event. To appear on event signage, we'd need to confirm your involvement by August 3, 2026.

Grand Traverse Hockey Association is a 501(c)(3) (EIN 38-3347536), so sponsorships are fully tax-deductible.

Checks are payable to GTHA (memo "${business} - 14UAA Golf Outing"), mailed to GTHA Sponsorship, 1600 Chartwell Dr., Traverse City, MI 49696; Venmo @Northstars14UAA also works. Gift cards or product for our prize tables are welcome too.

You can find event details and sponsor or donate online at ${cfg.fundraiserUrl}

Thank you for considering it - it makes a real difference for these young men and their families.

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
