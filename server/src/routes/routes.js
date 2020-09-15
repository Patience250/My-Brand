const express = require("express")
const Blog = require("../models/Blog")
const router = express.Router()
const blogController = require('../controllers/blogs')

// route for blog creation
router.post("/blogs", blogController.createBlog);

module.exports = router