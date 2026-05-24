## Summary

Kevin is a likeable guy who seems smart, capable and demonstrated a desire to do
well. His grasp of sql and storage concerns are pretty solid. He seemed nervous
and uneasy at times, getting flustered on occassion, and as a result did not
appear to think well on his feet. He ultimately provided good reasons for using
that monster sql query but given those, did not respond to questions leading him
to break it up like I would expect a level 5 to.

Kevin seems like the kind of dev you would want on your team for a more junior
role, but not a level 4 (or 5).

----------------------------- interview notes ----------------------------------

## Step 1: Intro (5 min)
  - introduction
  - explain process (review homework, problem)
  - any questions?

## Step 2a: Review Homework (40 min)
  - what factors did you take into account prior to designing your system?
    Answers:
      - time: wanted it done in 2-3 days
      - wanted to work with things he knew
      - get creative
      - meet criteria
      - balance of effeciency of system with his time
      - spent more time optimizing the backend than the front
      - unsure what internal meant
      - assumed less people viewing
  - how did the phrase "internal reporting application" effect your design
    decisions?
  - how would your design have differed for the same functionality but as a
    highly available, distributed production application? Answers:
      - backoff mechamism (?)
      - distributed, redundancy
      - throw more hardware at it
      - cache in genservers either by date or keyword
      - query could get slow. perhaps introduce a bunch of secondary read-only
        dbs w/ a single primary write
      - large datasets (date ranges) is better suited for mysql but smaller sets
        would be better done in elixir

    - how would you have handled weekly and monthly rollups alongside daily
      - simple addition to query
    - what if you had non-trivial limit on how much historical data you could
      store (data retention)
      - accumulator 
      - store/archive data for later retention
      * did not provide mechanism for this
  - what about your homework are you most proud of? (ie what best demonstrates
    your ability to be a sr level eng)
    - being easy to reason about. easy to change
    - everything is conventional & thus easily understood
  - what do you believe you could have done better?
    - pagination: didn't want to spend time (simle thing)
    - see readme for more
  - why did you solve the problem with the query?
    - optimize for reads across large datasets
    - multiple db reads would be better for smaller sets
    * given what he just said, I asked him question #1 again: what were your
      assumptions when devising your implementation?
      - alot of keywords
      - very low views (once or twice a day)

## Step 2b: Coding Question
  - encourage to think outline / thought process is important
  - ok to ask questions

  Question
  Given a parking lot of unknown length (labels starting at zero) and an
  unordered list of spaces that are taken, implement a function that returns the
  first available space.

  - struggled. I prompted until kind of handing him the answer but even then, he
    didn't really get it (or at least did not articulate well)

## Step 4: Questions about the Candidate (10 min)
  - what has the trajectory at this company been for you? (what jobs have you had)
  - (after 14 years) given the career you are building, why did you pick this job?
    - it's in seattle & wants to leave chicago

## Step 5: Candidate Questions
- asked what our daily jobs look like
- what is our assessment of the future of moz

## Related

- [[Interviews MOC]]
