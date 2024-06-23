# Debrid Client Proxy

## Description
TODO

## Installation

<!-- docker run and compose methods -->

### Docker Compose

1. **Create a `docker-compose.yml` file** with the following content:

```yaml
services:
  debridclientproxy:
    image: kipavy/debridclientproxy
    ports:
      - "80:5000"
    environment:
      - URL_PREFIX=/debrid
```

Note: URL_PREFIX is optional, it is used to prefix the routes of the proxy. Example: Instead of `http://localhost:5000/` it will be `http://localhost:5000/debrid/`

```bash
docker-compose up -d
```

### Docker Run

```bash
docker run -dit -p 5000:5000 -e URL_PREFIX=/debrid kipavy/debridclientproxy
```

## Testing Docker

```bash
docker build -t debridclientproxy . ; docker run -dit -p 5000:5000 debridclientproxy
```

## Dev

### Frontend

```bash
cd client/ ; npm start
```

### Fullstack

This way I don't have to have a dev & prod config.
    
```bash
cd server/
``` 
```bash
cd ../client/ ; npm run build ; cd ../server ; npm start
```