Pros
- familiarity with Elixir
- humble & willing to learn
- asked good questions before beginning CSV parse problem
- identified several possible (common) solutions for CSV

Cons
- very jr, struggled at almost every turn
- poor grasp on some basic data structures
- almost no familiarity with unix
- elixir background is not extensive
- communication & leadership below desired level
- not much (any?) experience in tough/stressful outage scenarios

To start off, we had some glitches to work around. I do not believe it had too
much of an impact beyond disrupting the flow and allowing Weiser as much
interaction/insight as would be desired. We will need to revisit some remote
interview options when pairing with a person in the office.

Evan was able to sketch out an elixir solution to a CSV parsing with some
difficulty. We ran out of time so it is hard to say when/if we would have
arrived at something useful. He did ask a couple of great clarifying questions
before beginning.

For me it was surprising how junior Evan appeared to be. His communication was,
at times, poor to such an extent I couldn't follow. When asked about outages and
solving tough problems his answers did not reflect an understanding of basic
troubleshooting, systems, monitoring or having been put in any kind of stressful
situation. When asked about datastructures he struggled with some basics. At
this point I shifted the line of question to assess familiarity with some basic
unix tools. Again, he struggled answering almost none of my questions.

A junior dev is fine but along with it I would want a set of core skills, both
technical and interpersonal, that Evan simply does not seem to possess.

This is a solid no for me.


* tell us about a hard problem you recently solved
- talked about solving a recipe problem for a side project

* what about work outage?
- anecdote about automating a call to bloomburg api
- their api stopped returning data
- he did not give specifics about troubleshooting other than 

* did you add alerting
- prior to outage he added a section to send himeself an email on any failure

* what (unix) tool could you use to find the number of lines in a file
- do not know

* what (unix) tool could you use to find the second column in a tab delimited
  file (like /etc/services)
- do not know

* what (unix) tool could you use to find all occurences of a string in a directory
- would grep do that?
  * yes. are you familiar with the flags to recursively find case-insensitive string?
  - no. I would probably look at the man page

* data structures question
- familiar with lists, not priority queues, and some aspects of hashmap

* Write a parser that returns the total number of data rows in a given CSV.
- initial verbal algo was muddled
- first portion of code included hand waving around how to handle meta section
- prompted him to try Enum.split in iex as he was not sure about usage
- simplified problem by telling him to parse "header 1, header 2\n\rfoo,bar"
  and return 1 (indicating 1 data row)
- Implementation was something like:

csv
|> Enum.split("\n\r")
|> Enum.filter(fn (line) -> String.trim(line) == "" end)
|> Enum.drop(1)
|> Enum.count

- He talked about using String.filter over Enum but when asked why, he simply
  said "performance". I tried to get him to say anything about memory usage and
  at one point it kind of almost sounded like he wanted to talk about how enum
  would bring the entire data structure into memory, but he didnt

## Related

- [[Interviews MOC]]
