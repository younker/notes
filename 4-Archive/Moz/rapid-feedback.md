## Chronos
- [ ] insight is sparse: what are the env vars or other basic info provided for marathon apps?
- [ ] different secret files for every chronos task
- [ ] redundant config for every chronos task (only a couple things change...for our use cases
- [ ] documentation: config options, what things mean. Where is it?
  - https://seomoz.atlassian.net/wiki/spaces/AP/pages/122126457/Deploying+via+Roger-cli
- [ ] logitudinal metrics? (runtime at least)

## Watchmen
- [ ] datadog integration (tags, config, etc)

## Marathon / Roger
- [ ] Automate deploy email (`git log sha_or_tag..sha_or_tag --oneline`)
- [ ] We need toLowerCase this b/c roger-cli config values of `true` end up as `True` after a deploy (demonstrated via the mozbar.yml value `STATSD_ENABLED: true`)

## Related

- [[Moz MOC]]
