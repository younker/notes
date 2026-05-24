# Keyword API

*doc*: https://docs.google.com/document/d/1m0F5hbltnf92OyLBJ9vK5Kc3DXrX8iilrMD_lnGr160/edit?ts=5b215562#

`keyword search volume`: walrus
`keyword metrics` (difficulty, priority, organic CTR): speke
`keyword suggestions`: crux
`SERPs`: silo
`keyword universe data`: feedstore

- allowing users to research in bulk
- integrate with other tools `?`
- build their own commercial product

## Barbosa: Viable Option?

Barbosa is the API powering our keywords research features gives us access to most of the required data:

- `search volume`
  - *tl;dr* this information is better retrieved directly from walrus
  - *more info* with volume coming from walrus and walrus being a thin node app in front of a couple of redis dbs, running requests through Barbosa introduces overhead/latency we likely do not want

- `keyword metrics`
  - *tl;dr* Speke is by far the better option but...
  - *more info* metrics come from the metric service speke. Having said that, Barbosa has been the victim of deferred maintenance which currently results in metrics being calculated locally rather than vending that work out to speke. This means we currently have metrics being calculated in 2 locations with a strong desire to move all metric calculations to the official metric service. Once again, Barbosa is not a good solution. However, issues may exist with Speke in it's current form.

- `suggestions`
  - *tl;dr* Yeah, we can do this
  - *more info* Barbosa does have a simple suggestions endpoint but it's more-or-less a passthrough (with quota management and other stuff around it). Suggestions can be expensive so the relative cost of running them through Barbosa is minimal

- `SERPs`
  - *tl;dr* we have the SERPs but only retain a subset of data
  - *more info* For full keyword analyses, these are present ephemeral. What we do persist is a subset of the SERP required to power the SERP Analysis page. This includes a majority of the results and features. However, some meta data even for those sections are lost. We would need to do an audit of what information is desired vs what information is retained.

Other considerations include:

- `interpol`: the API sits in front of Interpol, a toolkit for validating JSON API requests/responses. It is slated for removal from Barbosa as it can be too string, has substantial limitations, is no longer maintained and burdensome to work with. Using Barbosa for this API would require that:

  1. all endpoint use this validator
  1. we special-case all applicable endpoints
  1. as a prerequisite, we remove interpol from Barbosa 

- `speed`: Barbosa is written in ruby and was designed specifically for a frontend client fitting a specific profile/load, not an enterprise API on the scale required by this project. For example, Barbosa employed phusion passenger as it excelled at holding open connections for longer periods of time. This is a great fit given our keyword analyses take 4-15 seconds. Passenger has a substantial memory footprint and does not scale well. This was known but became very clear when we used a specialized Barbosa branch to service quota data to listerine for the links launch. The memory/cpu usage alongside the smaller, quicker, higher number of requests resulted in 2 outages. This resulted from an increase of on the order of dozens more per second which should highlight the inferior fit this API poses for such a use case.

- `application state`: Barbosa is not in a state to be built on for the following reasons:

  1. it has largely been in a kind of maintenance mode for the last couple of years. This is evidenced by the fact Speke, the metric service, has been in play for about 18 months and we have not yet taken the time to convert to it
  1. we recently placed quota duties for links on the embedded quota system and we are currently trying to undo that decision with work on the ProQuo quota system.
  1. the API role has evolved such that Barbosa really should be limited to list management for keyword explorer. All other major functionality (about 80% of the codebase) is slated for deprecation
  1. dependencies are out of date

## Metrics Serivce: Speke

*tl;dr* Speke needs a bit of work before we can use it at scale (when SERPs are not provided)

*more info*

Speke is basically a fork of Barbosa. We needed a "quick to market" replacement for the metric calculations deeply embedded in Barbosa in order to support the Keyword Universe initiative. Options were to rewrite in node/js or fork/tweak Barbosa. The latter option was quicker and that is how we came to have the metrics service. As the author, I [jason@] have concerns whether Speke could handle substantial load or morderate load for bulk features given it's present state. This is due to the reliance on qless/redis to perform tasks. This issue was encountered early on when processing serps at the rate required for feedstore. As a result, silo SERPs were handed to Speke rather than retrieved by speke. This allowed the throughput needed. Recent attempts to convert bulk metrics (keyword lists) to speke have encountered bugs.

Most, if not all, of these problems could be addressed by switching to a more modern async ruby technique. The use of something like `Concurrent::Promise` or similar library/technique would have substantial impact including:

  - `removed reliance on qless` Altering the approach to async work via  would remove most, if not all. of the need for qless. Currently, I believe the manner in which qless communicates with a remote redis instance results in substantial latency and needless complexity

  - `decreased complexity` The "task" system set up to support the modular/decoupled steps to achieve a given goal (like calculating difficulty or bundling 1000 keyword analyses) would see a dramatic decrease in code solutions far easier to reason about and follow simply by writing teh solutions in a more procedural manner than in a decoupled, job driven manner.

  - `speed` Speed gains would largely from replacing qless. By doing so:
    - we remove a massive number of HTTP requests
    - the latency between qless picking up jobs is removed. each step is executed without any delay

## Possible Solutions

-

## Related

- [[Moz MOC]]
