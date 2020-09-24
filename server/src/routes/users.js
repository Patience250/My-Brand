const express = require("express");
const passport = require("passport");
const router = express.Router()
const usersController = require('../controllers/users')

require('../config/passport')(passport)
const privateRoute = require("../middlewares/privateRoutes")
    // route for users
router.post("/register", usersController.createUser);
router.post("/login", usersController.loginUser)
router.get("/", privateRoute.hasToken(passport), usersController.getUsers)
router.get("/logout", usersController.logoutUser)
router.delete("/:id", usersController.deleteUser)

module.exports = router