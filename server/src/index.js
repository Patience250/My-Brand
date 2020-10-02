const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const serverPort = process.env.PORT || 5000
const User = require("./models/User")
const blogRouter = require("./routes/blogs")
const queryRouter = require("./routes/queries")
const userRouter = require("./routes/users")
const flash = require("express-flash")
const session = require("express-session")
const dotenv = require("dotenv")
const fileUpload = require("express-fileupload")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")





if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
dotenv.config();



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    createParentPath: true,
    useTempFiles: true
}))
const MongoStore = require('connect-mongo')(session);
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true
}
const connection = mongoose.connect(process.env.DB_STRING, dbOptions).then(() => {
    console.log("Database connected successfully.")
}).catch((error) => {
    console.log(error)
})

const sessionStore = new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: "sessions"
})

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))


require("./config/passport")
app.use(passport.initialize())


app.use("/api/blogs", blogRouter)
app.use("/api/queries", queryRouter)
app.use("/api/users", userRouter)
app.use("/api/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(flash())





app.listen(serverPort, () => {
    console.log(`Server has started on port ${serverPort}`)
})

module.exports = app