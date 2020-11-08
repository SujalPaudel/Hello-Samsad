const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: String,
  age: Number,
  ageRange: String,
  gender:String,
  designation: String,
  address: String,
  party: Number,
  state: String,
  description: String,
  education: Array,
  politicalHistory: Array,
  majorNews: Array,
})

module.exports = mongoose.model("people", schema)