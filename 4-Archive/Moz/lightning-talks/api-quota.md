# API Quota Spec

### Common API Requirements

- `keywords`
  - `authentication`: session id (mozauth)
  - `authorization`:
    - quota: limits (mozauth) vs used (barbosa db)
    - application-level checks
  - `tracking`: yes, for both keyword & subject (stampede)
  - `rate limiting`: no. We once had this via punji but disabled due to multiple async calls for a single tracked item
  - `quota management`: yes. Mozauth provided limits based on level; daily or monthly
  - `overage`: no

- `links`
  - `authentication`: session id (mozauth)
  - `authorization`:
    - quota: limits (mozauth) vs used (barbosa db)
    - application-level checks
  - `tracking`: only for lists (daily), not for links data
  - `rate limiting`: we are rate limited by idina (via gatekeeper) at service level (not user level)
  - `quota management`: Mozauth provided limits based on level; daily or monthly
  - `overage`: no

- `moz api`
  - `authentication`: signed auth via keymaster
  - `authorization`: not rate limited & access to `call` (keymaster endpoint)
  - `rate limiting`: limits provided by keymaster, implemented via koa-ratelimiter + redis
  - `quota management`:
    - free users have hard quota limit
    - paid users
      - no quota management due to allowed overage
      - report usage to keymaster (what does billing need?)
  - `overage`: yes


### Questions
- do we charge per analysis or by pieces (serp, difficulty, opporunity, volume, url metrics, etc)

## Related

- [[Moz MOC]]
