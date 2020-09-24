const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: String,
    message: String,
    image: String,
    dateCreated: { type: Date, default: Date.now }

});
module.exports = mongoose.model("Blog", schema)