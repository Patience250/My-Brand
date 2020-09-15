const Blog = require("../models/Blog")


// creating a blog in mongodb
exports.createBlog = async(req, res) => {
    const blog = new Blog(req.body)
    await blog.save()
    res.send({ data: blog })
}