<!-- insert img https://imgur.com/a/MtSqWO3 -->
![Debrid Client Proxy](https://i.imgur.com/zaLnApz.png)

<div align="center">

[![Docker Pulls](https://img.shields.io/docker/pulls/kipavy/debridclientproxy)](https://hub.docker.com/r/kipavy/debridclientproxy)
[![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/kipavy/debridclientproxy)](https://hub.docker.com/r/kipavy/debridclientproxy)
[![Docker Image Version (latest by date)](https://img.shields.io/docker/v/kipavy/debridclientproxy)](https://hub.docker.com/r/kipavy/debridclientproxy)

</div>

# Debrid Client Proxy

**Debrid Client Proxy** is a sophisticated proxy server designed for All-Debrid services. It centralizes your network requests, presenting a single IP address to your debrid provider, thereby enabling seamless access from any IP address. This is particularly useful for sharing access with trusted individuals without exposing multiple IP addresses. Built using the modern and efficient **Vite, React, and Express stack**, it offers a streamlined and **user-friendly** experience for managing your debrid service connections.

## Usage

### docker compose (recommended)

1. **Create a `docker-compose.yml` file** with the following content:

```yaml
services:
  debridclientproxy:
    image: kipavy/debridclientproxy
    restart: unless-stopped
    ports:
      - "80:5000"
    environment:  # Optionals
      - URL_PREFIX=/debrid
      - AGENT_NAME=YourAgentName
```

2. **Run the following command:**

```bash
docker compose up -d
```

Now you can open <http://localhost/debrid> in your browser.

Note: URL_PREFIX & AGENT_NAME are optionals, URL_PREFIX is used to prefix the routes of the proxy. Example: Instead of `http://localhost/` it will be `http://localhost/debrid/`. AGENT_NAME is used to set the user-agent of the requests made by the proxy.

### docker run

```bash
docker run -dit \
  -p 80:5000 \
  -e URL_PREFIX=/debrid \
  --restart unless-stopped \
  kipavy/debridclientproxy
```

## Testing Docker

```bash
docker build -t debridclientproxy . ; docker run -dit -p 80:5000 debridclientproxy
```

## Dev

```bash
cd server; npm i; cd ../client; npm i; cd ..; npm i
npm run dev
```
