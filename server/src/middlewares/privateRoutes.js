const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports.auth = (req, res, next) => {
    const token = req.header("auth-token")
    if (!token) return res.status(401).send({ error: "Access Denied" })
    try {
        const verified = jwt.verify(token, "skdhkshdkjhskhkhkjshfjkfsfd")
        req.user = verified;
        next();
    } catch (error) {
        return res.status(400).send({ error: "Invalid token" })
    }
}

module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).send({ error: "Access Denied" })
    }
}

module.exports.hasToken = (passport) => {
        return passport.authenticate('jwt', { session: false })
    }
    // module.exports.isAdmin = (req, res, next) => {

//     const adminUser = User.findOne({ isAdmin: req.user.isAdmin })
//     if (adminUser) {
//         return true
//     }
// }