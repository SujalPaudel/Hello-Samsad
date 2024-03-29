const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes") // new

mongoose
  .connect("mongodb://localhost:27017/helloSam", { useNewUrlParser: true })
  .then(() => {
    const app = express()
    app.use(express.json()) // new
    app.use("/api", routes)

    app.listen(5000, () => {
      console.log("Server has started!")
    })
  })