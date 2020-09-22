const passport = require("passport");
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const utils = require("../utils/utils")



const { userValidationSchema } = require("../validators/userValidations")
let result;
let hashedPassword;

//create new user
exports.createUser = async(req, res) => {
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).send({ error: "Email already taken ." })
    try {
        result = await userValidationSchema.validateAsync(req.body)
        const salt = await bcrypt.genSalt(10)
        hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        await newUser.save()
        res.send({ user: newUser._id })
    } catch (error) {
        console.log(error)
        res.status(400).send({ error: error.message })
    }







}

// Retrieve all queries
exports.loginUser = async(req, res, next) => {
    try {
        result = await userValidationSchema.validateAsync(req.body)
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send({ error: "Invalid credentials" });
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send({ error: "Invalid credentials" })
        const tokenObject = utils.issueJWT(user);
        res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
        req.headers.set("Authorization")
        res.end()
    } catch (error) {
        console.log(error)
        res.status(400).send({ error: error.message })
    }

}

// get 

exports.getUsers = async(req, res) => {
    const users = await User.find()
    return res.send({ data: users })

}

exports.deleteUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        await user.remove()
        res.send({ data: true })
    } catch {
        res.status(404).send({ error: "User not found!" })
    }
}

exports.logoutUser = async(req, res) => {
    req.logout();
    res.send("Logged out")
}