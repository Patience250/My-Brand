const Blog = require("../models/Blog")
const { blogValidationSchema } = require("../validators/blogValidations")
const { cloudinary } = require("../utils/cloudinary")
let result;
// creating a blog in mongodb
exports.createBlog = async(req, res) => {
    try {
        result = await blogValidationSchema.validateAsync(req.body)
        const blog = new Blog(req.body)
        await blog.save()
        res.send({ data: blog })
    } catch (error) {
        console.log(error)
        res.status(400).send({ error: error.message })
    }
}

// Retrieve all blogs
exports.findBlogs = async(req, res) => {
    console.log(req.session)
    const blogs = await Blog.find()
    res.send({ data: blogs })
}


// Retrieve single blog

exports.findBlog = async(req, res) => {
        try {
            const blog = await Blog.findById(req.params.id)
            res.send({ data: blog })
        } catch {
            res.status(404).send({ error: "Blog not found!" })
        }
    }
    // Update a blog
exports.updatedBlog = async(req, res) => {
        try {
            result = await blogValidationSchema.validateAsync(req.body)
            const blog = await Blog.findById(req.params.id)
            Object.assign(blog, req.body)
            await blog.save()
            res.send({ data: blog })
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
    // Delete a blog
exports.deleteBlog = async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        await blog.remove()
        res.send({ data: true })
    } catch {
        res.status(404).send({ error: "Blog not found!" })
    }
}