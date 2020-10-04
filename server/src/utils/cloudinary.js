const dotenv = require("dotenv")
const cloudinary = require("cloudinary")
dotenv.config()

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     secret_key: process.env.CLOUDINARY_API_SECRET_KEY
// })
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

module.exports = { cloudinary }