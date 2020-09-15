const Blog = require("../models/Blog")


// creating a blog in mongodb
exports.createBlog = async(req, res) => {
    const blog = new Blog(req.body)
    await blog.save()
    res.send({ data: blog })
}

// Retrieve all blogs
exports.findBlogs = async(req, res) => {
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
            const blog = await Blog.findById(req.params.id)
            Object.assign(blog, req.body)
            await blog.save()
            res.send({ data: blog })
        } catch {
            res.status(404).send({ error: "Blog not found!" })
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