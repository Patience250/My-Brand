const Joi = require("@hapi/joi")

const blogValidationSchema = Joi.object({
    title: Joi.string().min(3).required(),
    message: Joi.string().min(10).required()

})

module.exports = {
    blogValidationSchema
}