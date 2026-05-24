- dashboard: enter keyword 'hipster'
- overview: page view
  - insert row into `keyword_variants` (1)
  - insert row into `keyword_metrics` (2)
  - charge account with 1 serp refresh
  - fire off requests tied to `keyword_metrics_id` for `rappor`, `grepwords`, `suggestions` and `mentions`
  - coming back asynchronously...
    - cache mentions & suggestions in redis
    - insert all other data into `keyword_metrics` with id:40
    - send to UI
  - does the `account` have any `keyword_list` with `list_items` tied to this `variant`?
    - NO:
      - insert row in `keyword_research` in case they later want to add this to a list later on
    - YES:
      - update the `keyword_list_item` to point to the new `keyword_metrics_id`
- overview: click 'add to "Hipsters R Us" list'
  - insert row into `keyword_list_items` (3)
    - `list` & `variant` are known
    - `keyword_metrics_id` is not:
      - has this `account_id` performed `keyword_research` for this `variant` that was last updated < 24h ago?
        - YES:
          - add `keyword_metrics_id` from `keyword_research` to `keyword_list_items` row
        - NO:
          - fire off requests to `rappor` & `grepwords`
          - create `keyword_metrics` row
          - add `keyword_metrics_id` to row
- overview: click 'see full analysis'
  - request and cache `sharedcount` social data
  - do `keyword_metrics` exist for the variant that was last updated < 24h ago?
    - YES: (from this page, it should always exist since we had to create it to view it)
      - get the metrics and associated serp
    - NO:
      - charge account with 1 serp refresh
      - fire off requests to `rappor` & `grepwords`
      - create `keyword_metrics` row
      - get the metrics and associated serp
- analysis: click 'refresh'
  - a) do they have any refreshes left and b) is the analysis more than 24h old?
  - NO(a):
    - sorry, out of serps for the day
  - NO(b):
    - sorry, serp is still fresh
  - YES:
    - charge account with 1 serp refresh
    - fire off requests to `rappor` & `grepwords`
    - create `keyword_metrics` row (4)
    - does this `variant` belong to any list items for this `account`?
      - NO:
        - noop, this is pure research
      - YES:
        - update all `keyword_list_items` with new `keyword_metrics_id` (5)

# serp_id = select id from serps where keyword_variant_id = 'variant_id' and collected_at > 24.hours.ago
# select * from keyword_metrics where serp_id = serp_id

## Related

- [[Moz MOC]]
