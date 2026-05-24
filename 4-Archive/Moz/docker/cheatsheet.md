## Docker Cheatsheet

**One-off cmd on docker host**
`docker-compose run <app> <cmd>`

Example: `docker-compose run api ls -la /src`

**Build From Image**
`docker images`
`docker run -it <image>:<tag> <shell>`

Example: `docker run -it barbosa_api:latest bash`

**Random Troubleshooting**

```
boot2docker ssh
ps -aux
curl http://localhost:3000
docker ps -a
docker exec -it barbosa_api_1 bash
curl http://localhost:3000 # connection refused
ps aux  # ruby /usr/local/bundle/bin/rackup config.ru --port 8080
echo $PORT  
```

## Related

- [[Moz MOC]]
