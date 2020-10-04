const express = require("express")
const mongoose = require("mongoose")
const bookController = require('./controllers/books')


mongoose.connect("mongodb://localhost:27017/epress-mongoose", { useNewUrlParser: true }).then(() => {
    const app = express()

    app.use(express.json())
    app.get("/books", bookController.findBooks);
    app.post("/books", bookController.createBook);
    app.get("/books/:id", bookController.findBook);
    app.patch("/books/:id", bookController.updaBook);
    app.delete("/books/:id", bookController.deleteBook);


    app.listen(3000, () => {
        console.log("Server has started on port 3000.")
    })
}).catch(() => {
    console.log("Database connection failed.")
})