const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: String,
    message: String,

});
module.exports = mongoose.model("Blog", schema)