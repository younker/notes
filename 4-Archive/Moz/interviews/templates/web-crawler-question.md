## Web Crawler

Design a system for crawling a given single domain.

For more info, see https://gist.github.com/b4hand/5c16d462322aefa46795080ffd8e3944

#### Basic Components:
  - HTTP Fetcher (with priority)
  - Parser
  - Deduper
  - Datastore

#### Basic Process:
  - start with a URL (or crawl set)
  - GET each url
  - parse the response
  - store values
  - add new urls to pool
  - repeat

#### Considerations
- Crawl frequency
- Deduping
- Parsing
- Fault tolerance / error handling
- Crawl depth / when to stop
- DNS resolving: in aggregate, this can be very costly. Have your own cache to avoid dns lookups
- be polite: robots.txt for rules, cache it is possible for subsequent calls
- distributed: best to put all requests for a domain on the same node
- traps! be aware of crawler traps and loops / infinite sites (max crawl limit)
- seeding your crawl: what is the pool you start with?
- prioritize: mechanism to bump valid sites' priority and lower spammy sites
- ip blocks: proxies to help mitigate IP blocks
- POST/form pages: what do you do with forms? Are they worth it?

## Related

- [[Interviews MOC]]
