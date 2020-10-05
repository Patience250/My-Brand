"use strict";

var Joi = require("@hapi/joi");

var userValidationSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required()
});
var loginValidationScema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required()
});
module.exports = {
  userValidationSchema: userValidationSchema,
  loginValidationScema: loginValidationScema
};