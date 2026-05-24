## Breaking Down Listerine's TokenWrapper

This is a breakdown of the process by which we sign and then unwrap/verify our wrapped idina tokens. From PR https://github.com/seomoz/listerine/pull/75

**Question**
How do we "unwrap" a one-way cryptographic hashing function in order to verify it's authenticity and then provide the decrypted values?

**Answer**
By combining our own secret key with select base64 encoded values from the wrapped token, we are able to generate a challenge token in the same way that we created the `signature`. If they match, we know the `key` used to generate the provided `wrapped_token` was our private key and thus is valid.

#### Listerine.TokenWrapper.wrap

See https://github.com/seomoz/listerine/blob/master/apps/listerine/lib/token_wrapper.ex

```
iex(2)> idina_token = "idina-next-token"
iex(3)> offset = 50
iex(4)> secret = "secret_password"
iex(5)> t = Listerine.TokenWrapper.wrap(idina_token, offset, secret)
"SFMyNTY.ZzJnQ2JRQUFBQXRwWkdsdVlTQjBiMnRsYm1FeQ.R2zLaYSZBcZ9uKeB750jVrR0JowEWxAyRkgLhU8IXNc"
```

#### TokenWrapper.wrap(idina_token, offset, secret)

See https://github.com/elixir-plug/plug/blob/v1.4.3/lib/plug/crypto/message_verifier.ex#L19

````
iex(6)> tuple = {idina_token, offset}
{"idina-next-token", 50}

iex(7)> tuple_as_binary = :erlang.term_to_binary(tuple)
<<131, 104, 2, 109, 0, 0, 0, 11, 105, 100, 105, 110, 97, 32, 116, 111, 107, 101, 110, 97, 50>>

iex(8)> message = Base.url_encode64(tuple_as_binary, padding: false)
"g2gCbQAAAAtpZGluYSB0b2tlbmEy"

iex(9)> Plug.Crypto.MessageVerifier.sign(message, secret)
"SFMyNTY.ZzJnQ2JRQUFBQXRwWkdsdVlTQjBiMnRsYm1FeQ.R2zLaYSZBcZ9uKeB750jVrR0JowEWxAyRkgLhU8IXNc"
````

#### MessageVerifier.sign(message, secret, digest_type \\ :sha256)

```
iex(18)> message
"g2gCbQAAAAtpZGluYSB0b2tlbmEy"

iex(19)> digest_type = :sha256
:sha256

iex(20)> protected = "HS256"
"HS256"

iex(21)> signing_input_step1 = Base.url_encode64(protected, padding: false)
"SFMyNTY"

iex(22)> signing_input_step2 = Kernel.<>(signing_input_step1, ".")
"SFMyNTY."

iex(23)> signing_input_step3 = Base.url_encode64(message, padding: false)
"ZzJnQ2JRQUFBQXRwWkdsdVlTQjBiMnRsYm1FeQ"

iex(24)> plain_text = Kernel.<>(signing_input_step2, signing_input_step3)
"SFMyNTY.ZzJnQ2JRQUFBQXRwWkdsdVlTQjBiMnRsYm1FeQ"

iex(25)> signature  = :crypto.hmac(digest_type, secret, plain_text)
<<71, 108, 203, 105, 132, 153, 5, 198, 125, 184, 167, 129, 239, 157, 35, 86, 180, 116, 38, 140, 4, 91, 16, 50, 70, 72, 11, 133, 79, 8, 92, 215>>

iex(26)> hmac_sha2_sign = plain_text <> "." <> Base.url_encode64(signature, padding: false)
"SFMyNTY.ZzJnQ2JRQUFBQXRwWkdsdVlTQjBiMnRsYm1FeQ.R2zLaYSZBcZ9uKeB750jVrR0JowEWxAyRkgLhU8IXNc"
```

#### Token Breakdown

The token comprised 4 pieces:

1. `SFMyNTY`: this is a url safe base64 encoded representation of the hmac `digest_type` (`HS256`)
2. `ZzJnQ2JRQUFBQXRwWkdsdVlTQjBiMnRsYm1FeQ`: this is a url safe base64 encoded representation of the `message`. The `message` is the url safe base64 encoding of the binary version of the `{idina_token, offset}` tuple (`{"idina-next-token", 50}`)
3. `plain_text`: The first 2 pieces, mentioned above, when joined with a `.` comprise what is referred to in MessageVerifier as the `plain_text`
4. `R2zLaYSZBcZ9uKeB750jVrR0JowEWxAyRkgLhU8IXNc`: this is a url safe base64 encoded representation of the `signature`. The `signature` is the sha256 HMAC of the `secret` and `plain_text`

A simplified version of the token would look like this:

`HS256.{idina-next-token, 50}.sha256(secret_password SFMyNTY.ZzJnQ2JRQUFBQXRwWkdsdVlTQjBiMnRsYm1FeQ)`

#### TokenWrapper.unwrap(wrapped_token, secret)

```
iex(35)> wrapped_token
"SFMyNTY.ZzJnQ2JRQUFBQXRwWkdsdVlTQjBiMnRsYm1FeQ.R2zLaYSZBcZ9uKeB750jVrR0JowEWxAyRkgLhU8IXNc"

iex(36)> secret
"secret_password"

iex(37)> {:ok, message} = Plug.Crypto.MessageVerifier.verify(wrapped_token, secret)
{:ok, "g2gCbQAAAAtpZGluYSB0b2tlbmEy"}

iex(38)> {:ok, decoded_message} = Base.url_decode64(message, padding: false)
{:ok, <<131, 104, 2, 109, 0, 0, 0, 11, 105, 100, 105, 110, 97, 32, 116, 111, 107, 101, 110, 97, 50>>}

iex(39)> {idina_token, offset} = :erlang.binary_to_term(decoded_message)
{"idina token", 50}
```

#### MessageVerifier.verify(signed, secret)

Split the `wrapped_token`, recreate the `plain_text` and then generate a challenge token by recreating the `signature` in the same manner as `MessageVerifier.sign`. If they match, we know the `key` used to generate the provided `wrapped_token` (`signed` here) is our private and thus, is valid.

```
iex(41)> [protected, payload, signature] = String.split(wrapped_token, ".", parts: 3)
["SFMyNTY", "ZzJnQ2JRQUFBQXRwWkdsdVlTQjBiMnRsYm1FeQ", "R2zLaYSZBcZ9uKeB750jVrR0JowEWxAyRkgLhU8IXNc"]

iex(42)> plain_text = protected <> "." <> payload
"SFMyNTY.ZzJnQ2JRQUFBQXRwWkdsdVlTQjBiMnRsYm1FeQ"

iex(43)> {:ok, protected} = Base.url_decode64(protected, padding: false)
{:ok, "HS256"}

iex(44)> {:ok, payload} = Base.url_decode64(payload, padding: false)
{:ok, "g2gCbQAAAAtpZGluYSB0b2tlbmEy"}

iex(45)> {:ok, signature} = Base.url_decode64(signature, padding: false)
{:ok, <<71, 108, 203, 105, 132, 153, 5, 198, 125, 184, 167, 129, 239, 157, 35, 86, 180, 116, 38, 140, 4, 91, 16, 50, 70, 72, 11, 133, 79, 8, 92, 215>>}

iex(46)> digest_type
:sha256

iex(47)> challenge = :crypto.hmac(digest_type, key, plain_text)
<<71, 108, 203, 105, 132, 153, 5, 198, 125, 184, 167, 129, 239, 157, 35, 86, 180, 116, 38, 140, 4, 91, 16, 50, 70, 72, 11, 133, 79, 8, 92, 215>>

iex(48)> Plug.Crypto.secure_compare(challenge, signature)
true
```

## Related

- [[Moz MOC]]
