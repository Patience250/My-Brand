const Query = require("../models/Query")
const { queryValidationSchema } = require("../validators/queryValidations")
let result;

// Save query in mongodb
exports.createQuery = async(req, res) => {
    try {
        result = await queryValidationSchema.validateAsync(req.body)
        const query = new Query(req.body)
        await query.save()
        res.send({ data: query })
    } catch (error) {
        console.log(error)
        res.status(400).send({ error: error.message })
    }
}

// Retrieve all queries
exports.findQueries = async(req, res) => {
    const queries = await Query.find()
    res.send({ data: queries })
}