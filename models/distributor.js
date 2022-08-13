let mongoose = require("mongoose")
let Schema = mongoose.Schema

let DistributorSchema = new Schema(
  {
    distributorName: {
      type: String
    },
    distributorMaxLimit: {
      type: Number,
      default: 1000
    },
  },
  { timestamps: true }
)

let Distributor = mongoose.model("distributors", DistributorSchema, "distributors")
module.exports = { Distributor }
