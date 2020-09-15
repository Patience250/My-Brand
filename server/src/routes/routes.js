const express = require("express")
const Blog = require("../models/Blog")
const router = express.Router()
const blogController = require('../controllers/blogs')

// route for blog creation
router.post("/blogs", blogController.createBlog);
router.get("/blogs", blogController.findBlogs);
router.get("/blogs/:id", blogController.findBlog);
router.patch("/blogs/:id", blogController.updatedBlog);
router.delete("/blogs/:id", blogController.deleteBlog);

module.exports = router