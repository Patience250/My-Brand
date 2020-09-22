const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const bcrypt = require("bcrypt")
const User = require("../models/User")
const fs = require("fs")
const path = require('path');

// const customFields = {
//     usernameField: "email",
//     passwordField: "password"
// }
// const verifyCallback = async(email, password, done) => {
//     const found_user = await User.findOne({ email: email });
//     try {
//         const validPassword = await bcrypt.compare(password, found_user.password)
//         User.findOne({ email: email }, function(err, user) {
//             if (err) { return done(err); }
//             if (!user) {
//                 return done(null, false, { message: 'Incorrect credentials.' });
//             }
//             if (!validPassword) {
//                 return done(null, false, { message: 'Incorrect credentials.' });
//             }
//             return done(null, user);
//         });
//     } catch (error) {
//         console.log(error)
//     }
// }
// const strategy = new LocalStrategy(customFields, verifyCallback)
// passport.use(strategy)

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//         done(err, user);
//     });
// });


// End of local strategy
// function initialize(passport, getUserByEmail, getUserById) {
//     const authenticateUser = async(email, password, done) => {
//         const user = getUserByEmail(email)
//         if (user == null) {
//             return done(null, false, { message: "No user with that email" })
//         }
//         try {
//             if (await bcrypt.compare(password, user.password)) {
//                 return done(null, user)
//             } else {
//                 return done(null, false, { message: "Incorect password" })
//             }
//         } catch (error) {
//             return done(error)

//         }

//     }

//     passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser))
//     passport.serializeUser((user, done) => done(null, user.id))
//     passport.deserializeUser((id, done) => {
//         return done(null, getUserById(id))
//     })
// }

// module.exports = initialize
const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"]
}

const strategy = new JwtStrategy(options, (payload, done) => {
    User.findOne({ _id: payload.sub }).then((user) => {
        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    }).catch(error => done(error, null))
})
module.exports = (passport) => {
    passport.use(strategy)
}