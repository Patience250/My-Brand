"use strict";

var express = require("express");

var Blog = require("../models/Blog");

var router = express.Router();

var passport = require("passport");

var blogController = require('../controllers/blogs');

var privateRoute = require("../middlewares/privateRoutes"); // route for blog 


router.post("", privateRoute.hasToken(passport), blogController.createBlog);
router.get("", blogController.findBlogs);
router.get("/:id", blogController.findBlog);
router.patch("/:id", privateRoute.hasToken(passport), blogController.updatedBlog);
router["delete"]("/:id", privateRoute.hasToken(passport), blogController.deleteBlog);
module.exports = router;