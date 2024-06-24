# Use a Node.js image to build your client app
FROM node:current-alpine AS build
WORKDIR /usr/src/app
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Use another Node.js image to build your server app
FROM node:current-alpine
WORKDIR /usr/src/app
COPY server/package*.json ./server/
RUN npm install --prefix server
COPY server/ ./server/

# Copy the client build to the appropriate directory
COPY --from=build /usr/src/app/dist ./client/dist

# Add and prepare the script to update the PUBLIC_URL in static files if needed
COPY update-prefix-url.sh ./update-prefix-url.sh
RUN chmod +x ./update-prefix-url.sh

EXPOSE 5000

# Set the working directory to /usr/src/app/server
WORKDIR /usr/src/app/server

# Simplify the CMD instruction, as the working directory is already /usr/src/app/server
CMD ["/bin/sh", "-c", "../update-prefix-url.sh && node server.js"]