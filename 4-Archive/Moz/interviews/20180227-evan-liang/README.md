# KeywordRegister

Registers keywords and get daily rollup summaries

A couple of notes: I didn’t make it a REST API, nor did I do the extra credit. I am hoping that my code makes up for this.

## Installation

Project Delivery:
requires Elixir 1.5+ and Erlang 20. I was also able to build when targeting Elixir 1.3
also requires Redis 4.0.1

1. unzip the attached zip file
2. cd to da path
3. mix deps.get
4. mix compile
5. iex -S mix

how to register a keyword from the shell:
  KeywordRegister.register [ “keyword1”, “keyword2”]

check out the test file if you want to register a keyword with different dates

getting the rollup structure:
  KeywordRegister.get_rollup()

I contemplated following the string format provided in the example, but ultimately decided against it. I was unclear on exactly how this program would be used, so I decided to keep everything in a map for flexibility.


If [available in Hex](https://hex.pm/docs/publish), the package can be installed
by adding `keyword_register` to your list of dependencies in `mix.exs`:

```elixir
def deps do
  [
    {:keyword_register, "~> 0.1.0"}
  ]
end
```

Documentation can be generated with [ExDoc](https://github.com/elixir-lang/ex_doc)
and published on [HexDocs](https://hexdocs.pm). Once published, the docs can
be found at [https://hexdocs.pm/keyword_register](https://hexdocs.pm/keyword_register).

## Related

- [[Interviews MOC]]
