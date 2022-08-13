let mongoose = require("mongoose")
let Schema = mongoose.Schema

let CustomerSchema = new Schema(
  {
    customerName: {
      type: String
    }
  },
  { timestamps: true }
)

let Customer = mongoose.model("customers", CustomerSchema, "customers")
module.exports = { Customer }
