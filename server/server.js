const express = require("express");
const path = require("path");
const apiRoutes = require("./routes/api");
const app = express();

let PrefixUrl = "";

// Serve static files from the React app with PrefixUrl prefix
app.use(PrefixUrl, express.static(path.join(__dirname, "../client/build")));

// Parse incoming requests data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use api routes with PrefixUrl prefix
app.use(`${PrefixUrl}/api`, apiRoutes); // Now safe from double slashes

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file, considering PrefixUrl.
app.get(`${PrefixUrl}/*`, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});