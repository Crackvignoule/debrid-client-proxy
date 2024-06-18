# Use a Node.js image to build your client app
FROM node:current-alpine as build
WORKDIR /usr/src/app
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Use another Node.js image to build your server app
FROM node:current-alpine
WORKDIR /usr/src/app
COPY server/package*.json ./
RUN npm install
COPY server/ ./server
# Copy the built client app from the previous stage
COPY --from=build /usr/src/app/build ./client/build
EXPOSE 5000
CMD [ "node", "server/server.js" ]