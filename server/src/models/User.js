const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    dateCreated: { type: Date, default: Date.now }

});
module.exports = mongoose.model("User", schema)