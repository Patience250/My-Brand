"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var mongoose = require("mongoose");

var passport = require("passport");

var serverPort = process.env.PORT || 5000;

var User = require("./models/User");

var blogRouter = require("./routes/blogs");

var queryRouter = require("./routes/queries");

var userRouter = require("./routes/users");

var flash = require("express-flash");

var session = require("express-session");

var dotenv = require("dotenv");

var fileUpload = require("express-fileupload");

var swaggerUi = require("swagger-ui-express");

var swaggerDocument = require("./swagger.json");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

dotenv.config();
var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(fileUpload({
  createParentPath: true,
  useTempFiles: true
}));

var MongoStore = require('connect-mongo')(session);

var dbOptions = _defineProperty({
  useNewUrlParser: true,
  useUnifiedTopology: true
}, "useUnifiedTopology", true);

var connection = mongoose.connect(process.env.DB_STRING, dbOptions).then(function () {
  console.log("Database connected successfully.");
})["catch"](function (error) {
  console.log(error);
});
var sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: "sessions"
});
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

require("./config/passport");

app.use(passport.initialize());
app.use("/api/blogs", blogRouter);
app.use("/api/queries", queryRouter);
app.use("/api/users", userRouter);
app.use("/api/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(flash());
app.listen(serverPort, function () {
  console.log("Server has started on port ".concat(serverPort));
});
module.exports = app;