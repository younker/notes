
CURL request directly to `prod.roger.dal.moz.com` demonstrating success if we bypass cloudflare:

```bash
$ curl 'http://prod.roger.dal.moz.com/explorer/api/2.3.2/site/rankings/counts' -H 'cookie: mozauth=kkmRkfXHwWGGwjFYfXSgj0dSI6Echyi57q30edk5kgvS9gjPfCFTWJyJa2wDDbnJ' -H 'content-type: application/json' --data '{"subjects":{"primary":{"target":"moz.com","scope":"domain"},"secondaries":[]}}'

{"meta":{"percent_complete":100,"notifications":[],"by_keyword_set":[{"subject":{"target":"moz.com","scope":"domain"},"expected_keyword_count":46019,"collected_keyword_count":46019,"available_keyword_count":46019}]},"data":[{"subject":{"target":"moz.com","scope":"domain"},"ranks":[1566,1119,1162,1078,994,939,938,938,1031,948,927,862,903,885,914,905,843,920,906,927,931,852,903,880,931,867,834,849,854,863,885,885,885,839,865,850,912,884,868,936,940,872,936,909,948,897,842,843,898,656]}]}
```

CURL request directly to `prod.roger.dal.moz.com` with the `X-Forwarded-Proto` header demonstrating failure:

```bash
$ curl -H 'X-Forwarded-Proto: https' http://prod.roger.dal.moz.com/explorer/api/2.3.2/site/rankings/counts -H 'cookie: mozauth=kkmRkfXHwWGGwjFYfXSgj0dSI6Echyi57q30edk5kgvS9gjPfCFTWJyJa2wDDbnJ' -H 'content-type: application/json' --data '{"subjects":{"primary":{"target":"moz.com","scope":"domain"},"secondaries":[]}}' | pretty-print

{
  "status": 500,
  "message": "Failed to open TCP connection to stampede.dal.moz.com:443 (Connection refused - connect(2) for \"stampede.dal.moz.com\" port 443)"
}
```

Deploy change to strip the `X-Forwarded-Proto` header (github.com/seomoz/barbosa/commit/ea1dddf3) and retest:

```bash
$ curl -H 'X-Forwarded-Proto: https' http://prod.roger.dal.moz.com/explorer/api/2.3.2/site/rankings/counts -H 'cookie: mozauth=kkmRkfXHwWGGwjFYfXSgj0dSI6Echyi57q30edk5kgvS9gjPfCFTWJyJa2wDDbnJ' -H 'content-type: application/json' --data '{"subjects":{"primary":{"target":"moz.com","scope":"domain"},"secondaries":[]}}'

{"meta":{"percent_complete":100,"notifications":[],"by_keyword_set":[{"subject":{"target":"moz.com","scope":"domain"},"expected_keyword_count":46019,"collected_keyword_count":46019,"available_keyword_count":46019}]},"data":[{"subject":{"target":"moz.com","scope":"domain"},"ranks":[1566,1119,1162,1078,994,939,938,938,1031,948,927,862,903,885,914,905,843,920,906,927,931,852,903,880,931,867,834,849,854,863,885,885,885,839,865,850,912,884,868,936,940,872,936,909,948,897,842,843,898,656]}]}
```

## Related

- [[Moz MOC]]
