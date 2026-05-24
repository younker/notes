## Random bot detection ideas

#### Options
- roll our own / refine request limiter
- purchase: distil networks or akamai (bot manager)
- sift science (talk to inbound)

##### Score
- calc score based on:
  - geographic location
  - fishy names
  - community account?
  - user agent
  - hit rate/count/frequency/reliability
  - speed
  - 4xx errors
  - cookie tracking
  - consistent browser behavior violations
  - mouse movement
  - input (key) cadence 

#### Pattern & Behavior
- if a user reaches a max use threashold for x number of usage periods (or consectuvite periods)
  - **max use** what is humanly possible by a user over 1 minute
    - graphs suggest around 20 hits
    - add 50% on to that to be safe
  - **usage period** a period of time (say 30 minutes) and if a user hits max_use the above defined heavy use threshold more than x times in that period
- is there an endpoint pattern that is not deviated from?
- compare start times. do they consistently start at roughly the same time every day
- divide the day into small chunks (based on average active time spent on site by real users)
  - are they active for more than x total chunks in a day
  - are they active for more than x consecutive chunks?
  - are they active for x chunks per day for more than 5 days a week?

## Related

- [[Moz MOC]]
