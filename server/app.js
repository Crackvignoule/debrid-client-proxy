const express = require("express");
const path = require("path");
const apiRoutes = require("./routes/api");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");

const app = express();

let PrefixUrl = "";

app.use(PrefixUrl, express.static(path.join(__dirname, "../client/dist")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(`${PrefixUrl}/api`, apiRoutes);
app.use(`${PrefixUrl}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get(`${PrefixUrl}/*`, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

module.exports = app;
