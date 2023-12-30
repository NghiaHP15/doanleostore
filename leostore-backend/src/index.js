const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const bodyParser = require("body-parser");
const route = require("./routes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

database.connect();

app.use(bodyParser.json());
route(app);
app.listen(port, () => {
  console.log("Server is running in port ", port);
});
