const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  img: String,
})

module.exports = mongoose.model("delegate", schema)