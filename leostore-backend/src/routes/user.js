const express = require("express");
const route = express.Router();
const User = require("../app/controllers/UserController");

route.post("/sign-up", User.creatUser);
route.post("/sign-in", User.loginUser);
route.put("/update-user/:id", User.updateUser);

module.exports = route;
