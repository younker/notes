# Migrate to GraphQL Q/A

## How long with this take?

We are at a fortunate stage where a transition to graphQL will be relatively painless. Steps (and estimated story points) include:

- (3) actually implement graphQL service
- (3) modify where we perform authorization checks
- (2) update documentation
- (5) ensure backwards compatibility with existing GET endpoints*
- (5) exposing graphical interface

I believe we can perform the transition inside of a single sprint.

\* if desired. There will also be an ongoing cost associated with maintaining both systems. This cost would take 2 forms:
- new endpoint development would take ~75% longer to ensure compatibility and consistency between systems
- maintenance & debugging complexity increases when multiple systems exist

If we only manage 1 system (graphQL or HTTP GETs), of course things get much easier. Also note that GraphQL does allow GETs, just as our system currently does, with the only change being the query string structure (and that can be generated automatically for you by the same tool that exposes API documentation)

## If there are costs other than time, what are they and what is a rough guess on those?

**Maintenance**

The primary issue beyond time is that of maintaining 2 systems, as noted above.

Looking forward, managing the relational aspects of our data would fall to us. For example, a common use case now in our internal systems is to pull a SERP, extract the URLs from the results, get link metrics for those URLs and then inject them back into the SERP at the proper location. This process is currently performed in Barbosa (keywords API), Speke (metrics service powering Feedstore) and others. Broken down in simple terms, the relationship could be described as:

- a SERP has many results
- a result has one URL
- a URL has many url metrics

This read-only relational data is where graphQL excels but it does put the burden on us glue it all together. This would be a huge win for several of our internal systems because MDAPI would do it for them, but it would require us to do this work rather than just expose each piece of data independent from the other.

Cost: there is not a one-time cost associated but rather a moderate to small cost associated with ongoing maintenance.

**Bigger Picture**

One-off endpoints allow a certain degree of slop. That is to say if you need to expose data x, you make a new endpoint called GET /x and you are done. However, if x is relationally tied to other data in the system, you now need to take that into consideration. That is not to say you cannot simply expose x directly, independent of y. However, it does mean that you have other considerations and decisions to make.

Perhaps an example is best: lets say a user simply wants DA for a URL. In our current API approach, we would simply expose a GET /url-metrics?url=moz.com endpoint and we're done.

In graphQL, you would need to make sure DA is available as an attribute of a SERP in addition to a standalone query:

```
{
  url_metrics(url: moz.com) { da },
  serp(keyword=moz) { url_metrics { da } }
}
```

The above psuedo-query would return da for moz.com and a serp for the keyword moz with da attached to all of the urls found in the SERP results.

There are of course patterns to ease the technical implementation of this such that code is not duplicated and maitenance costs are low. However, because we remove the burden from the customer, we may likely incur cost that comes along with that.

Cost: there is not a one-time cost associated but rather a moderate to small cost associated with ongoing maintenance.

## What systems will be impacted (near, mid, long term)

**Near Term**

The MDAPI team would of course need to convert to GraphQL and then begin the process of treating internal groups as we do external customers. However, the solution would likely mirror that of our test user which was simply to create an account with custom limits. This pattern is proven and is also how links, barbosa and our metric service interface with idina.

**Mid Term**

- Local: As local moves to bridge the gap with pro, they are considering ways of getting at some of this data. A graphQL API could expose some of what they need (what data tbd) and would decrease the amount of work required to get off the ground. They would also benefit from advancements a dedicated team could provide rather than relying on dev resources available in the team.

- Technical Operations: with graphql, the number of queries made to the API will be dramatically reduced. In the above example, the GraphQL query retrieves all the data in 1 query. Retrieving the same data in our current API would require a customer to make 12 API queries (1 for the SERP, 10 url metrics requests for the SERP results and 1 url metrics request for the URL 'moz.com'). This dramatically reduces the number of connections and amount of traffic through our systems. This would likely decrease some of the burden on our infrastructure. Additionally, if customers query to only select data they want, the amount of data being sent over the wire would decrease. CPU usage and memory would not likely change. However, we would not need as many API instances running since we would have a bunch of connections available and so perhaps we would need to bump the amount of CPU and memory each instance needs in order to handle the increase in traffic that node would likely receive. 

- (internal) Customers: In the same example (above), the custom is no longer required to write involved procedural scripts to retrieve data, process it, retrieve some more and then merge it all together. This would translate to reduced developer cost here at Moz since the data would already exist in it's relational or discrete form to any team regardless of their tech stack or need.

- (external) Customers: A cost associated with GraphQL is that it is new. Most devs need no rampup time to know how to write a GET query string. As such there is a cost associated with our customers learning the query language. However, I believe with the provided tooling and intuitive, simple nature of the query language, this is not an issue.

**Long Term**

- Cleanup: As teams move to MDAPI, many systems (which perform the same function) can be deprecated. For example, a substantial chunk of maui (amount unknown), barbosa (~35%) and a smaller portion of listerine (~10-15%) could be replaced with some queries to this API. The cost of deprecating is offset by the long term savings of maintaining only 1 system **

- There is a trend to compose larger API from several smaller GraphQL APIs. An example of this could be that the new Walrus v3 is build in GraphQL and is totally independant of MDAPI. At some point in the future, it could be possible to simply absorb that API into MDAPI with little work. Put another way, the work the MDAPI team did to expose volume would not have been necessary.

\*\* Note that MDAPI as a GraphQL API does not solve all problems experienced by Maui, Barbosa, Listerine and others. For example it does not do list management or similar work. Those tasks would continue to be the responsibility of the existing APIs.

**Keymaster**

Note that there is no mention of Keymaster here. There is an ongoing question of buy vs build and the work involved with that decision lies totally outside this decision. Put another way, how we expose our data has little to no impact on our usage and quota reporting. This assumes the system we buy, if we go that route, is flexible enough to handle our current usecase.

## Who will be impacted (that is, what teams will need to perform actions to make this useful ... and can we apply resources to those teams to help them out)?

This is mostly touched on above. I think the most likely team to be impacted soon wouldl be the local one moz intitiative. That team already has expertise around graphQL so the learning curve thing is not an issue. Additionally, we have pro devs over there that are familiar with MDAPI and GraphQL helping to grease the wheels.

After that, I would argue that some of the other pro apps migrate MDAPI. Most of the systems that would utilize such a thing internally are in pro or local. Most other teams would simply supply the data to us (ie idina, pro services)

Maui migrating to this would have a massive impact (for the better) on our systems and would dramatically reduce complexity spread out through our APIs and frontends.

## (my own) Product Perspective

We are late to the API game and our competitors have substantially larger offerings than we do. However, because we are smaller we can easily make this transition such that we can stand out from our competition by exposing an API with cutting-edge access patterns that I believe will become the norm.

## Related

- [[Moz MOC]]
