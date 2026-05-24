## Option #1: API-level Rate Limiting
We allow a set number of queries across all API endpoints over a fixed period of time.

Pros:
- easy to communicate
- easy to implement/enfoce
- easy to represent state in response

Cons:
- we have to set the limit low enough to not put any pressure on our slowest endpoint basically limiting the data they can get access to

## Option #2: Call-level Rate Limiting
We allow a set number of queries to each API endpoint over a fixed period of time. The allowed limit for each endpoint may be different

Pros:
- easy to implement/enfoce
- easy to communicate throttling information
- solves problem seen in option #1 by allowing (potential) customer load commensurate with what we can handle
- allows us to also gate data based on it's value to us

Cons:
- difficult to represent state in response
- as we build out our API, the amount of data we agree to have available per customer increases. In essence, by allowing each customer to hit the API as aggressively as each call allows, we cannot control the total number of API calls for a given customer. This results in an API that cannot sustain continued growth both in respect to data we offer and users adopting the system.

## Option #3: Both API & Call-level Rate Limiting
We combine options #1 and #2

Pros:
- we guard against excessively API-level traffic
- we access to data at a rate reflecting what we can handle
- easy to represent state in response

Cons:
- difficulty to communicate to customers
- confusing implementation

## Option #4: Token System
We throttle at the API level by assigning a value to each piece of data. This is best described by example:

A user has 100 tokens to spend over the course of a second. Each piece of volume data for a keyword costs 1 token. Each batch of suggestions for a keyword costs 5 tokens. We monitor what they spend and throttle if they try to spend too much.

Pros:
- easy to communicate
- easy to implement/enforce
- easy to represent state in response
- protects us at the API level
- allows us to also gate data based on it's value & what we can handle
- builds off the quota limitations & lessons learned by the keyword research quota system

Cons:
- some users may (not read the documentation and) expect that any single call requires a single token

## Related

- [[Moz MOC]]
