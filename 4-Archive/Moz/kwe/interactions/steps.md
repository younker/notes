### 14810 on 2015-07-06
- overview: first page view for 'hipster'
  - do we have `keyword_research` for this `variant`? **NO**
  - insert row into `keyword_variants` (1)
  - insert row into `keyword_metrics` (2)
  - charge account with 1 serp refresh (redis)
  - fire off requests to `rappor`, `grepwords`, `suggestions` and `mentions`
  - coming back asynchronously...
    - cache mentions & suggestions (redis)
    - update `keyword_metrics` with all other data (2)
  - insert row into `keyword_research` for `keyword_metrics` (3)
  - does the `account` have any `keyword_list` with `list_items` tied to this `variant`? **NO**

- overview: n+1 page view for 'hipster'
  - do we have `keyword_research` for this `variant`? **YES**
  - is it for the account 14810? **Yes**
  - get `keyword_metrics` from `keyword_research` for this `account` and `variant`
  - request `suggestions` and `mentions` (in redis)

- create list: from CSV
  - insert row into `keyword_lists` (4)
  - parse CSV for each variant:
  - [0]: cardigan
    - do we have `keyword_research` for this `variant`? **NO**
    - insert row into `keyword_variants` (5)
    - insert row into `keyword_metrics` (6)
    - charge account with 1 serp refresh (redis)
    - fire off requests to `rappor` & `grepwords`
    - update `keyword_metrics` with data (6)
    - insert row into `keyword_list_items` (7)
    - insert row into `keyword_research` for `keyword_metrics` (8)
  - [1]: hipster
    - do we have `keyword_research` for this `variant`? **YES**
    - is it for the account 14810? **YES**
    - has the `account` done any `keyword_research` for this `variant` within 24h? **YES**
    - get `keyword_metrics` from `keyword_research` for this `account` and `variant`
    - insert row into `keyword_list_items` (9)
  - insert row into `keyword_list_metrics` (10)

- serp analysis page view (hipster)
  - request and cache (redis) `sharedcount` social data
  - has the `account` done any `keyword_research` for this `variant` within 24h? **YES**
  - get `keyword_metrics_id` from `keyword_research` for this `account` and `variant`
    - retrieve `keyword_metrics`
    - retrieve `serp` for `keyword_metrics`

- serp analysis page view (narwhal)
  - request and cache (redis) `sharedcount` social data
  - has the `account` done any `keyword_research` for this `variant` within 24h? **NO**
  - insert row into `keyword_variants` (11)
  - insert row into `keyword_metrics` (12)
  - charge account with 1 serp refresh (redis)
  - fire off requests to `rappor` & `grepwords`
  - update `keyword_metrics` with data (12)
  - insert row into `keyword_research` for `keyword_metrics` (13)

- serp analysis: refresh hipster serp
  - request and cache (redis) `sharedcount` social data
  - has the `account` done any `keyword_research` for this `variant` within 24h? **YES**
  - sorry, can't refresh, the serp is still fresh

### 14810 on 2015-07-09
- serp analysis: refresh narwhal serp
  - request and cache (redis) `sharedcount` social data
  - has the `account` done any `keyword_research` for this `variant` within 24h? **NO**
  - do we have `keyword_metrics` for this `variant` which is < 24h old? **NO**
  - charge account with 1 serp refresh (redis)
  - fire off requests to `rappor` and `grepwords`
  - create `keyword_metrics` with data (14)
  - does the `variant` belong to any list items for this `account`? **NO**
  - insert row into `keyword_research` for `keyword_metrics`

- serp analysis: refresh hipster serp
  - request and cache (redis) `sharedcount` social data
  - do we have `keyword_research` for this `variant`? **YES**
  - is it for the account 14810? **NO**
  - charge account with 1 serp refresh (redis)
  - insert `keyword_research` row for `account_id` using existing `keyword_metrics` for `variant` (15)
  - does the `variant` belong to any list items for this `account`? **YES**
  - update `keyword_list_items` to use new `keyword_metrics_id` (16)


on stale serp refresh expect
- a new serp is retrieved
- keyword metrics associated with serp are updated
- keyword metrics NOT associated with serp are NOT updated

## Related

- [[Moz MOC]]
