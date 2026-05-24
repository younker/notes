Pros
- smart; demonstrated a deep understanding of many areas we talked through
- would likely be a good mentor
- good communicator
- emotionally intelligent & likeable

Cons
- common, but not ideal, solution to parsing question
- possible room for improvement around pairing

Before I say anything...
His depth of knowledge exceeded mine in some areas. I call this out so it is
clear that while I do not believe this was the case, he could have been selling
me snake oil for portions of the interview.

I think Matt would be make a good addition to Moz. He is clearly smart with a
deep understanding in all areas we covered. Having said that, we were unable to
dig into some API-specific questions due to time constraints. Also, while he did
hit the high points as we asked, my guess is that his understanding of browser
response handling came from a blog rather than experiential knowledge.

Matt seems to have a history of mentoring/developing more junior devs. His
pairing methods were not the ones I would choose but he did demonstrate a
willingness and ability to understand where the other dev is coming from and try
to meet them where they are at in a way that stacks the deck in their favor. His
communication was clear and he showed a tendency to get stuck in the technical
weeds (which is not a bad thing but can be bothersome in a liason role with
other [non-technical especially] teams).

Anyway, any critique I have is easily outweighed by the strength I saw making
this a pretty easy decision to hire.



* Tell me about the request lifecycle in as much detail as possible.

  **answer**
  - url in browser -> generates interrupts as you type (mouse,key)
  - os sharing interrupts into events
  - parse url (proto, domain, path)
  - check browser cache .. dns ?
  - no? -> os -> packet out on udp on 53 for dns request
  - ...
  - in depth understanding of pre transport (os handling)
  - deep understanding of transport, tcp, low-level 
  - handshake -> sequence & impact (private key, did not mention piecing the packets back together)
  - understands basics of request structure
  - I think the browser portion is much more a result of his prep work than a deep understanding... just a hunch


* How would you parse these CSV files where it is split into 3 sections: meta, header & data
**answer**
- outlined a workable solution using a series of regular expressions. It made
  sense at the time but I could not summarize most fo it now (60 minutes later).

- after exploring issues more junior devs might encounter with the regex-based
  solution, he suggested using the `x` flag and adding comments to the regex,
  using method names, etc that are self-documenting

- when pushed a bit further, he outlined a solution where you walk through the
  file keeping state so you know what is/not a line of data

* As senior dev, how do you initiate/facilitate mentoring on your team?
  **answer**
  - csv parse: sit down, assess dev you are speaking with and meet them where they are at
  - option to pair or give direction
  - driver/passenger method when under tight deadline
  $ great insight into how to communicate with people


* you are getting random 503s from a service, where do you start troubleshooting
  **answer**


* as you see it, what are the primary roles or concerns of a senior dev/arch?
  **answer**

## Related

- [[Interviews MOC]]
