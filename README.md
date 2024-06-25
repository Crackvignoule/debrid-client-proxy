# Debrid Client Proxy
<!-- Image + icone rectangle github + rapide description -->

## Usage

### docker compose (recommended):

1. **Create a `docker-compose.yml` file** with the following content:
```yaml
services:
  debridclientproxy:
    image: kipavy/debridclientproxy
    restart: unless-stopped
    ports:
      - "80:5000"
    environment:  # Optional
      - URL_PREFIX=/debrid
```

2. **Run the following command:**
```bash
docker compose up -d
```

Now you can open http://localhost/debrid in your browser.

Note: URL_PREFIX is optional, it is used to prefix the routes of the proxy. Example: Instead of `http://localhost/` it will be `http://localhost/debrid/`

### docker run:

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
npm run dev
```
