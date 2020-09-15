const express = require("express")
const queryRouter = express.Router()
const queryController = require('../controllers/queries')

// route for blog creation
queryRouter.post("", queryController.createQuery);
queryRouter.get("", queryController.findQueries);


module.exports = queryRouter