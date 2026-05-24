Summary

We hit the ground running and perhaps that was not the best approach. Woody seemed nervous to the point of it effecting his communication and though process.

We asked him to build us a simple, non-distributed crawler that reports back url, status and title. His solution was a pretty rough sketch of something that would work in a limited fashion. There were design decisions which I believe would become a problem quickly when pitted against a larger website or thrown any kind of curve ball. His error handling was vague and once I pushed a bit, he gave me something that would work but was suboptimal. I, for one, struggled following some of his design largely due to what I believe was nerves. I tried to ask leading questions to get him to hit specific talking points (how do you deal with a dns lookup failure vs a 503) but felt like I ultimately ended up handing him the answers.

Big red flags were he could not remember the anchor tag, could say almost nothing about structure of an http response (for example he demonstrated a vague awareness of headers but could not talk about how he would handle a redirect) and provided a very poor first draft for error handling. He barely touched or showed no awareness of seeding the crawl, managing crawl frequency, guaging the crawl depth (or when to stop), prioritization of crawls among others.

Woody let us know that this question was well outside his domain of expertise; I want to know what his strong suit is. I believe he is smart with a bredth of knowledge that could benefit our team. However, I do not believe our question surfaced any of those strengths. The best thing he did was outside the scope of what we were trying to solve but it was to generate a graph of the site and not just provide a result set with title, status and url.

From what I saw, I would say no. However, I know there is something there and I really want one of the other technical interviews to surface it!


Notes

fetch
  - he said GET but moved on, try to come back and get more on this
  - wget -> got sidetracked & skipped this going straight to map for data we are to hold
  * communication became an issue here. he does not know what we want

parse
  - map "string", node record
  - key being the url
  - test for (sub) domain

add to graph
  - going to have to build the graph as I traverse

Map "URL" -> Queue[NodeRecord]

NodeRecord
  bool visited?
  string URL
  int Status
  string Title

What are some problems with using the url as the lookup?
  - they could reorgnize the site
  * said nothing of normalization or how anchor tags present (ie //sub.domain.com vs https://sub.domain.com vs http://sub..., query params or other things that effectively create the same url but would otherwise end up hashing differently)

DNS failure
  - put it in an error queue and finish the others
  - come back and try a different dns server
  * tried to get him to talk about prioritization and nothing. I just handed him the answer and still, nothing

On Failure
  - update the node record with a timestamp (so we don't crawl too soon) and retry count
  - write to disk & setup a cron to retry later on

## Related

- [[Interviews MOC]]
