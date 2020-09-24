const Blog = require("../models/Blog")
const { blogValidationSchema } = require("../validators/blogValidations")
const { cloudinary } = require("../utils/cloudinary")

let result;
let file;

// creating a blog in mongodb
exports.createBlog = async(req, res) => {
        try {
            result = await blogValidationSchema.validateAsync(req.body)

            let imageurl;
            if (!req.files) {
                console.log(req.files)
                return res.status(400).send({ error: "No file uploaded" })
            } else {
                if (req.files.image.mimetype != 'image/jpeg' &&
                    req.files.image.mimetype != 'image/png' &&
                    req.files.image.mimetype != 'image/jpg') return res.status(400).send({ error: "Only images can be uploaded" })
                file = await req.files.image
                cloudinary.uploader.upload(file.tempFilePath, (result, error) => {
                    imageurl = result.url
                    const blog = new Blog({
                        title: req.body.title,
                        message: req.body.message,
                        image: imageurl
                    })
                    blog.save()
                    res.send({ data: blog })
                })

            }


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
            if (!req.files) {
                Object.assign(blog, {
                    title: req.body.title,
                    message: req.body.message
                })
                await blog.save()
                res.send({ data: blog })
            } else {
                if (req.files.image.mimetype != 'image/jpeg' &&
                    req.files.image.mimetype != 'image/png' &&
                    req.files.image.mimetype != 'image/jpg') return res.status(400).send({ error: "Only images can be uploaded" })
                file = await req.files.image
                cloudinary.uploader.upload(file.tempFilePath, (result, error) => {
                    imageurl = result.url
                    Object.assign(blog, {
                        title: req.body.title,
                        message: req.body.message,
                        image: imageurl
                    })
                    blog.save()
                    res.send({ data: blog })
                })
            }

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