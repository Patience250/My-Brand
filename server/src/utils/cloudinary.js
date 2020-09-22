const dotenv = require("dotenv")
const cloudinary = require("cloudinary")
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CloudName,
    api_key: process.env.CloudAPIKey,
    secret_key: process.env.CLOUDINARY_API_SECRET_KEY
})

module.exports = { cloudinary }