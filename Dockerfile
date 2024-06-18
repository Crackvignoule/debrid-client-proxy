# Use a Node.js image to build your client app
FROM node:current-alpine as build
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
COPY --from=build /usr/src/app/build ./client/build
EXPOSE 5000
CMD [ "node", "server/server.js" ]