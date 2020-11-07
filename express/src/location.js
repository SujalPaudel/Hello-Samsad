const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: String,
  type: String,
  state: Number,
  district: String,
  representative: Array,
  repId: String
})

module.exports = mongoose.model("location", schema)