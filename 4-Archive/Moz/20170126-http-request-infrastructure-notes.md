## Request Infrastructure

These notes were compiled while trying to determine where in the moz infrastructure, user requests were failing. 

#### Basic Request Flow

`User` -> `cloudflare` -> `F5` -> `mozauth` -> `F5` -> `Roger HA proxy` -> `app container` -> `app`
                                                    -> `app vm`
#### curl requests

**app (rogeros) container**: pick a container, any container, and see if it is responding

`curl -i http://dalmesos09:31275/bartender/healthcheck`

**first f5 (?)** For anything after mozauth, we need to pass the headers

(passing mozauth headers)
`curl -i -X POST -H 'mozauth-pro_start:1184025600' -H 'mozauth-display_name:Pro Standard' -H 'mozauth-level:pro' -H 'mozauth-admin:0' -H 'mozauth-account_services:{"search":{"name":"Keyword Explorer Community","status":"active","level":"explorer_community","limits":{"explorer":{"keyword":{"research":5,"term":"day","lists":0,"keywords_per_list":0}},"mozbar":{"term":"month","mozscape":75000,"features":"partial"}}}}' -H 'mozauth-developer:0' -H 'mozauth-avatar://d1avok0lzls2w.cloudfront.net/img_users/42.jpg?1383584065' -H 'mozauth-photo:1' -H 'mozauth-beta_tester:0' -H 'mozauth-photo_date:1383584065' -H 'mozauth-banned:0' -H 'mozauth-photo_ext:jpg' -H 'mozauth-email:jason@moz.com' -H 'mozauth-private_name:0' -H 'mozauth-last_active:1466188607' -H 'mozauth-private_email:1' -H 'mozauth-account_id:42' -H 'mozauth-subscriber:1' -H 'mozauth-accounts:[{"id":42,"name":"Pro Standard Account","owner":1,"level":"pro","status":"active","start":"2008-10-13T17:00:00-07:00"}]' -H 'mozauth-mozpoints:197' -H 'mozauth-local_push:1' -H 'mozauth-full_name:Pro Standard' -H 'mozauth-premium:1' -H 'mozauth-analytics_beta:1' -H 'mozauth-id:47' -H 'mozauth-qa_admin:0' -H 'Accept:application/json, text/javascript, */*; q=0.01' -H 'Accept-Encoding:gzip, deflate, br' -H 'Content-Type:application/json; charset=UTF-8' --data '["apple.com","amazon.com","example.com"]' http://prod.roger.dal.moz.com/bartender/url-metrics`

(passing cookies)
`curl -X POST -H 'cookie:mozauth=CUwpw6e7Ie46B3bLTR8NE6SG297v700Vy7L5yCOBQ0qZy9KIlHR7rwTzZP7pkaL4' -H 'Content-Type:application/json' --data '["apple.com","amazon.com","example.com"]' http://prod.roger.dal.moz.com/bartender/url-metrics`


## F5 (the company) Big/IP
- big/ip was the initial product which was load balancing and traffic management
- behind cloudflare sits our


curl -i \
  -H 'mozauth-account:{"id":211893,"name":"Jsn Ynkr","owner_id":211893,"parent_id":null,"products":{"search":{"name":"Moz Pro Premium","status":"active","created_at":1456300800,"trial_expires_at":null,"billing":{"period":"1-months","expires_at":null}}}}'
  -H 'mozauth-account_services:{"search":{"level":"pro_elite","name":"Moz Pro Premium","status":"active","limits":{"analytics":{"campaigns":{"active":100,"archived":100,"branded_report":1,"brand_rules":10,"competitors":3,"engines":4,"keywords":7500},"crawl":{"crawl_test":100,"default_depth":20000,"recrawl":100,"site_depth":250000,"speedcrawl":1,"static_limit":0,"total_depth":5000000}},"explorer":{"keyword":{"keywords_per_list":1000,"lists":100,"research":30000,"term":"month"}},"mozbar":{"features":"all","mozscape":75000,"term":"month"},"research":{"keyword":{"by_site_competitor_count":2,"lists":{"keywords_per_list":1000,"total":100},"queries":{"rows_per_query":100000,"term":"month","total":30000}},"links":{"lists":{"links_per_list":1000,"total":100},"queries":{"compare_links_urls":5,"rows_per_query":75000,"term":"month","total":100000}}},"seats":999}}}'
  -H 'mozauth-accounts:[{"id":211893,"name":"Jsn Ynkr","owner":"1","level":"pro_elite","status":"active","owner_id":211893,"parent_id":null,"products":["search"]}]'
  --data '{}'

## Related

- [[Moz MOC]]
