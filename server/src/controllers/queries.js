const Query = require("../models/Query")


// Save query in mongodb
exports.createQuery = async(req, res) => {
    try {
        const query = new Query(req.body)
        await query.save()
        res.send({ data: query })
    } catch (error) {
        console.log(error)
        res.status(404).send({ error: "Something went wrong sending your message." })
    }
}

// Retrieve all queries
exports.findQueries = async(req, res) => {
    const queries = await Query.find()
    res.send({ data: queries })
}