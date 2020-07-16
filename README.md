# Websocket + Redis Chat for cloud.gov

A demo app showing how to use [WebSockets](https://socket.io/) and [Redis](https://redis.io/) to build a simple chat app that runs on cloud.gov.

## Usage

Clone this repo. Then deploy it as a cloud.gov app and attach a new Redis service to it.

```bash
~$ cf push --no-start
~$ cf create-service redis32 standard-ha redis-chat
~$ cf bind-service redis-chat redis-chat
~$ cf push
```

Run `cf apps` to see the route assigned to your app and open the URL in a browser.