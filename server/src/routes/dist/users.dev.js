"use strict";

var express = require("express");

var passport = require("passport");

var router = express.Router();

var usersController = require('../controllers/users');

require('../config/passport')(passport);

var privateRoute = require("../middlewares/privateRoutes"); // route for users


router.post("/register", usersController.createUser);
router.post("/login", usersController.loginUser);
router.get("/", privateRoute.hasToken(passport), usersController.getUsers);
router.get("/logout", usersController.logoutUser);
router["delete"]("/:id", privateRoute.hasToken(passport), usersController.deleteUser);
module.exports = router;