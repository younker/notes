## Today

## Weekly
*tuesday*
- [x] wrap pager duty -> moz utils
- [x] wrap pager duty integration into listerine
- [x] where are we at with datadog metrics of listerine (sans container name)
- [x] deploy listerine 1.2.0
- [x] deploy s3 upload chronos

*wednesday*
- [x] Check chronos/s3 make sure things ran as planned:
  - https://s3.console.aws.amazon.com/s3/buckets/mozpro-tracked-urls/prod/?region=us-east-1&tab=overview
  - https://chronos-prod-roger.dal.moz.com/#jobs/moz-analytics-listerine-report-list-metrics/moz-analytics-listerine-upload-tracked-urls-to-s3
- [x] deploy Katie's chronos job
- [x] kickoff homework group: https://github.com/seomoz/interviews/pull/6
- [x] manager feedback
- [x] failing chronos jobs: punt -- https://seomoz.atlassian.net/browse/MP-9589
- [x] Listerine 1.2.0 Candidate
  - https://github.com/seomoz/roger-cli/pull/692
- [-] spin up IAM s3 accounts for
  - handed off to benf
- [x] mp-9573: PR for Listerine pager duty (jason/pager-duty-mp-9573)
  - [-] Debug failed upload with `--debug` flag to task -- punt: https://seomoz.atlassian.net/browse/MP-9590
  - [-] Runbook for failed CSV upload
  - [x] Figure out s3 bucket perms for Idina (bkramer)
- [x] Alter bartender to include data dog tag so we can put the dashboard together
- [x] mp-9052: migrate bartender to watchmen
- [-] bartender outage docs

**thursday** (and friday)
- [x] scale down listerine 1.1.0
- [x] deploy bartender
- [x] datadog dashboard - bartender satus codes
- [x] Datadog dashboard - listerine metrics (now w/o hostname)
- [x] Merge Chronos PR
  - https://github.com/seomoz/roger-cli/pull/693
- [x] mp-9051: migrate barbosa to watchmen
- [x] confirm all requests send statsd info to datadog

## Related

- [[Moz MOC]]
