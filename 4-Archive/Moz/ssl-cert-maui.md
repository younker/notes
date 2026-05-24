openssl genrsa -out local.moz.com.key 2048
openssl req -new -key local.moz.com.key -out local.moz.com.csr

vi local.moz.com.ext

  authorityKeyIdentifier=keyid,issuer
  basicConstraints=CA:FALSE
  keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
  subjectAltName = @alt_names

  [alt_names]
  DNS.1 = local.moz.com

openssl x509 -req -in local.moz.com.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial -out local.moz.com.crt -days 1825 -sha256 -extfile local.moz.com.ext


--------------------

Mixed Content: The page at 'https://local.moz.com/pro' was loaded over HTTPS, but requested an insecure stylesheet 'http://local.moz.com/pro/public/hopscotch-min.css'. This request has been blocked; the content must be served over HTTPS.


--------------------

server {
    listen 443 ssl;
    server_name local.moz.com;

    location /pro/public {
        proxy_http_version 1.1;
        proxy_set_header Upgrade websocket;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Scheme $scheme;
        proxy_pass http://docker.for.mac.localhost:3101;
    }
...
}

results in:

mozauth-prod-proxy | 2018/02/16 21:41:22 [error] 7#7: *4 upstream prematurely closed connection while reading response header from upstream, client: 172.22.0.1, server: local.moz.com, request: "GET /pro/public/bundle.js HTTP/1.1", upstream: "http://192.168.65.2:3101/pro/public/bundle.js", host: "local.moz.com"

## Related

- [[Moz MOC]]
