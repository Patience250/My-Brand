const express = require("express")
const mongoose = require("mongoose")
const serverPort = process.env.PORT || 5000

const blogRouter = require("./routes/blogs")
const queryRouter = require("./routes/queries")
mongoose.connect("mongodb://localhost:27017/my-brand", { useNewUrlParser: true }).then(() => {
    console.log("Database connected successfully.")
}).catch((error) => {
    console.log(error)
})

const app = express()
app.use(express.json())
app.use("/api/blogs", blogRouter)
app.use("/api/queries", queryRouter)

app.listen(serverPort, () => {
    console.log(`Server has started on port ${serverPort}`)
})