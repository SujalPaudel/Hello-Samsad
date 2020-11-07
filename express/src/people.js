const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: String,
  age: Number,
  gender:String,
  designation: String,
  address: String,
  party: Number,
  residence: String,
  description: String,
  education: Array,
  politicalHistory: Array,
  majorNews: Array,
})

module.exports = mongoose.model("people", schema)