const user = require("./user");

function app(route) {
  route.use("/api/user", user);
}

module.exports = app;
