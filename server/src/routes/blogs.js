const express = require("express")
const Blog = require("../models/Blog")
const router = express.Router()
const passport = require("passport")
const blogController = require('../controllers/blogs')
const privateRoute = require("../middlewares/privateRoutes")

// route for blog 
router.post("", privateRoute.hasToken(passport), blogController.createBlog);
router.get("", blogController.findBlogs);
router.get("/:id", blogController.findBlog);
router.patch("/:id", privateRoute.hasToken(passport), blogController.updatedBlog);
router.delete("/:id", privateRoute.hasToken(passport), blogController.deleteBlog);

module.exports = router