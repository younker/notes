```
keyword_lists         (4)    1, 14810, active, 'Hipsters R Us', 2015-07-06
  id
  account_id
  state
  title
  created_at

keyword_list_items    (7)    10, 1, 31, 41
  id                  (9)    11, 1, 30, 40
  keyword_list_id     (16)   11, 1, 30, 44 **update on refresh**
  keyword_variant_id
  keyword_metrics_id

serps (TTL:30d)       (2b)   20, 30, '[{"rank":1,"title":"Hipsters - Wikipedia","pa":55,"da":100,...}]', 2015-07-06
  id                  (6b)   21, 31, '[{"rank":1,"title":"Cardigan | Sweaters for ...","pa":41,"da":86,...}]', 2015-07-06
  keyword_variant_id  (12b)  22, 32, '[{"rank":1,"title":"Narwhals are Hipsters","pa":41,"da":86,...}]', 2015-07-06
  results (json)      (14b)  23, 30, '[{"rank":1,"title":"Narwhals were Hip","pa":42,"da":85,...}]', 2015-07-09
  collected_at               24, 30, '[{"rank":1,"title":"Hipsters - Wikipedia","pa":56,"da":100,...}]', 2015-07-09

keyword_variants      (1)    30, 'hipster', 'google', 'en-US'
  id                  (5)    31, 'cardigan', 'google', 'en-US'
  keyword             (11)   32, 'narwhal', 'google', 'en-US'
  engine
  locale

keyword_metrics       (2)    40, 30, 20, 52, 2, 10000, 20000, 2015-07-06
  id                  (6)    41, 31, 21, 85, 8, 12000, 22000, 2015-07-06
  keyword_variant_id  (12)   42, 32, 22, 12, 72, 9000, 18000, 2015-07-06
  serp_id             (14)   43, 32, 23, 11, 74, 3000, 7000, 2015-07-09
  difficulty                 44, 30, 24, 11, 73, 3100, 7200, 2015-07-09
  opportunity
  volume_min
  volume_max
  last_updated

keyword_list_metrics  (10)   50, 1, 2, 0, 1, 11000, 21000, [0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,2], 30, [1,0,0,0,0,1,0,0,0,0], 5, [2,0,0,0,0,0,0,0,0], 2015-07-06
  id
  keyword_list_id
  keyword_count
  expired_serp_count
  engine_count
  volume_min
  volume_max
  volume_buckets
  difficulty_average
  difficulty_buckets
  opportunity_average
  opportunity_buckets
  last_updated

keyword_research       (3)   14810, 30, 40
  account_id           (8)   14810, 31, 41
  variant_id          (13)   14810, 32, 42
  keyword_metrics_id         22310, 30, 24
                      (15)   14810, 30, 24
```
**Notes**
- `keyword_research` request TTL of 24H; could amount to a `QuotaManagement` class using redis
- bits for buckets?
- are the `keyword_list_metrics` volume values averages or min/max of all keywords?
- should the `keyword_research` have a 24h ttl or `expires_on` with is the `serp`s `collected_at` datetime + 24H?
- social data could easily be saved with serps.

## Related

- [[Moz MOC]]
