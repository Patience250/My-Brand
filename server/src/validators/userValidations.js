const Joi = require("@hapi/joi")

const userValidationSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()

})
const loginValidationScema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
})
module.exports = {
    userValidationSchema,
    loginValidationScema
}