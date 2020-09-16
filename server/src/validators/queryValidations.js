const Joi = require("@hapi/joi")

const queryValidationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(10).required()

})

module.exports = {
    queryValidationSchema
}