# Use a Node.js image to build your client app
FROM node:current-alpine AS build
WORKDIR /usr/src/app
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Use another Node.js image to build your server app
FROM node:current-alpine
WORKDIR /usr/src/app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./

# Change working directory back to /usr/src/app before copying the client build
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./client/dist

# Add a script to update the PUBLIC_URL in static files if needed
COPY update-prefix-url.sh /usr/src/app/update-prefix-url.sh
RUN chmod +x /usr/src/app/update-prefix-url.sh

# Create the uploads directory
RUN mkdir -p /usr/src/app/uploads

EXPOSE 5000

CMD ["/bin/sh", "-c", "/usr/src/app/update-prefix-url.sh && node server/server.js"]