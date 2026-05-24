service vs data-oriented architecture
-------------------------



- what makes sense for my API?
  
- not an evolution from rpc -> rest -> graphql, rather, they are different tools for different purposes

RPC: remote procedural call
  - model functions
  - call a function on a remote server
  - fits well with action or command oriented APIs
  - modern iterations: low overhead, high performance -- gRPC & Twirp -> great for internal communication between (speke & idina or stampede and feedstore)
  - highly coupled: can be solved by introducing a layer of abstraction which is the goal of...

REST: representational state transfer
  - model resources
  - architectural style (not a framework or even spec)
  - strong goal of decoupling client & server


GraphQL: 
  - does not model anything, it queries: ask for exactly what you want
  - starts with strongly typed schema
    - description of all queries you can make (and their types)
    - similar to how we send a sql query to our db
  - facebook app uses 1 graphql query to pull in all data for the UI
    - really nice when low network overhead is required
  - fits graph-like (relationships) data, not great for "flat" data

  - more power & more complex
  - cannot leverage http cache -> ends up with custom caching

Where is a query language for an API useful at Moz?
- Links data
  - mozscape: flip bits
  - idina: give it all back / flags to group data

Major pieces:
- schema
- resolvers

## Related

- [[Moz MOC]]
