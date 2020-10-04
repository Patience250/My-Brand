"use strict";

var passport = require("passport");

var User = require("../models/User");

var bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

var utils = require("../utils/utils");

var _require = require("../validators/userValidations"),
    userValidationSchema = _require.userValidationSchema,
    loginValidationScema = _require.loginValidationScema;

var result;
var hashedPassword; //create new user

exports.createUser = function _callee(req, res) {
  var emailExists, salt, newUser;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 2:
          emailExists = _context.sent;

          if (!emailExists) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(400).send({
            error: "Email already taken ."
          }));

        case 5:
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(userValidationSchema.validateAsync(req.body));

        case 8:
          result = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 11:
          salt = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 14:
          hashedPassword = _context.sent;
          newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
          });
          _context.next = 18;
          return regeneratorRuntime.awrap(newUser.save());

        case 18:
          res.send({
            user: newUser._id
          });
          _context.next = 25;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](5);
          console.log(_context.t0);
          res.status(400).send({
            error: _context.t0.message
          });

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 21]]);
}; // Retrieve all queries


exports.loginUser = function _callee2(req, res, next) {
  var user, validPassword, tokenObject;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(loginValidationScema.validateAsync(req.body));

        case 3:
          result = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 6:
          user = _context2.sent;

          if (user) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(400).send({
            error: "Invalid credentials"
          }));

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 11:
          validPassword = _context2.sent;

          if (validPassword) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", res.status(400).send({
            error: "Invalid credentials"
          }));

        case 14:
          tokenObject = utils.issueJWT(user);
          res.set("Authorization", tokenObject.token);
          res.status(200).json({
            success: true,
            token: tokenObject.token,
            expiresIn: tokenObject.expires
          });
          res.end();
          _context2.next = 24;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(400).send({
            error: _context2.t0.message
          });

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 20]]);
}; // get 


exports.getUsers = function _callee3(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.find());

        case 3:
          users = _context3.sent;
          return _context3.abrupt("return", res.send({
            data: users
          }));

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          return _context3.abrupt("return", res.status(404).send({
            msg: _context3.t0.message
          }));

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.deleteUser = function _callee4(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 3:
          user = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(user.remove());

        case 6:
          res.send({
            data: true
          });
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          res.status(404).send({
            error: "User not found!"
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.logoutUser = function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          try {
            req.logout();
            res.send("Logged out");
          } catch (error) {
            res.status(400).send({
              msg: error.message
            });
          }

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
};