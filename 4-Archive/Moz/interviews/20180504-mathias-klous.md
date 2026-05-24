Pros
- very likeable, good culture fit
- willing to dig in and put forth effort (eager, driven, etc)
- was able to identify concerns/weaknesses of his homework and offer alt. solutions
- insight into tradeoffs and consideration for (data) modeling

Cons
- when asked about REST (vs other options), was not terribly familiar with
  philosophy behind any of them
- really struggled with a rather simple CSV parsing question
- sounds like he wants more devops work
- junior dev whose emphasis is outside our tech stack == slower ramp up

I really appreciate the effort Mathias put into the homework. He demonstrated a
good amount of thought and consideration for the stack and problems it
presented. He was easy to talk to and seemed interested to hear about the work
involved with the job.

Mathias came to us from a devops referral as that is the position he initially
showed interest in. He mentioned several times that he is interested in problems
and solution more applicable to the RAPID team than ours.

His background and our stack have almost no overlap. For some candidates this is
not a problem at all. However, my opinion is that Mathias is a junior dev.
Combining these two factors equate to more time/energy to ramp up and begin
meaningful contributions, a luxury I am not sure we have right now.

My biggest pause was his answer to a rather simple CSV question. Over 10-15
minutes he never quite composed a cohesive answer or approach and never
identified a rather simple method for programmatically discovering data.

I really want to say bring him in but honestly, given our needs and current
situation, I do not believe Mathias is a good technical fit for our team right
now. If RAPID has open headcount, especiallly for a junior dev, you may want to
send him to Amy.


Questions
* Homework: Walk me through your process

microservice backed by nosql
how to model data -> stored in a way where it could be retrieved
retrieved in consumable form immediately
! confusion initially (due to wording) about requirements
  - understood it should be all keyword rollup not per keyword
$ quickly identified complexity in computeSums
- ack. brute force approach
- identified runtime
- improving runtime using hashmap

* Homework: Tell me about yoru decision process for the specific stack/solutions you employed
- instead of list primary datastructure -> convert to hashmap & iterate on keys to produce report
- wanted to build via dockerfile
- in java, probably would have used telegraph and influx (3rd party libs). in a
  production setting these ooptions would make it more robust

(mentions REST)
* Why REST?
- familiar
- HTTP protocol is universal
- rpc is an option

* Homework: What is the biggest sticking point of your solution?
- how to compute the sums
- wish I could have achieved that in the data model but by the time he realized
- he misunderstood the requirements he was already hours in

* Homework: What was the most difficult portion of the project?
- src/main/java/com/example/keywordregistry/dataaccess/impl/DynamoDBAccess.java
  - struggled with dynamoDB API. Would have liked more time to improve code

* Homework: What are ways you could improve on computeSums?

* Walk through algo for parsing CSV files
- delimeters easy to detect with regex
- could extract "Total Results" from header, better to program.. find it though
- regex to look for first line of data
- parse the 

* What are your consideration for writing this code
- gain perspective, look for irregularities
- identify use cases for data
- fixtures -> tdd
- in scripting lang (python) -> read line by line
- in java -> use CSV parsing library
  - do you reallly bring in a library?
    - you could use cmd (wc -l)

* How would you parse the CSV for quick lookup of an arbitrary value (ie 'keyword')
- parse, put into hash map
- scripting....if you know min is 3rd col, you could sed regex
- depends on what you want as result. If into an application & people maintain, how often, 

$ talked alot bout schema but never talked about parsing header row to discover
the data programmatically

* How would you approach a problem whereby you are lead for a project to create
  an API for use by enterprise customer such that they can retrieve data from
  any number of backend services.

* Why a non java job?
- history of frontend stuff
- wants to do more platform work
- applied for devops, they sent him to us
- looking to operate in new space

* Docker
- Year at nordstrom, alot of docker use/experience

- excited about problem
- had to reign himeself in polishing/iterating


# CSV Question

```
Assumptions
- optional "meta" section which:
  - will be the first section in a file
  - the delimeter will start with a hash, space and then at least 50 dashes
- required "header" row
- optional (0 or more) data rows


Example #1
# --------------------------------------------------        
Keyword ynkr.org      
Suggestion Type Mix of sources (default)      
Filters       
Total Results 2     
Volume Minimum  n/a     
Volume Maximum  n/a     
Export Date 2018-05-01      
# --------------------------------------------------        
        
        
Keyword,Relevancy,Min,Volume,Max Volume  
ynkr.org,5,n/a,n/a 
ynkr,2,n/a,n/a 



Example #2
Keyword, Min, Volume, Max, Volume, Difficulty, moz.com, Top, Rank, moz.com, Top, Ranking, URL
moz, 11501, 30300, 73, 1, https://moz.com/
moz, local, 4301, 6500, 66, 1, https://moz.com/products/local
```

## Related

- [[Interviews MOC]]
