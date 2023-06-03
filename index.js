var express = require("express");
const dotenv = require("dotenv");
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("./db/connect");
const elements = require("./routes/elements.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: "https://elements-richard.onrender.com",
  clientID: "DciNcQ4tiRf3MyaFzGCd94yuWOIv4BOu",
  issuerBaseURL: "https://dev-c05tuxzqaokwihrb.us.auth0.com",
};

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app
  .use(bodyParser.json())
  .use(cors())
  .use(auth(config))
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use("/", elements);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
