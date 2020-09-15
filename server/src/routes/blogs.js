const express = require("express")
const Blog = require("../models/Blog")
const router = express.Router()
const blogController = require('../controllers/blogs')

// route for blog creation
router.post("", blogController.createBlog);
router.get("", blogController.findBlogs);
router.get("/:id", blogController.findBlog);
router.patch("/:id", blogController.updatedBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router