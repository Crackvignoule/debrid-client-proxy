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