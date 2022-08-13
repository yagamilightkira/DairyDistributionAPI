let mongoose = require("mongoose")
let Schema = mongoose.Schema

let OrderSchema = new Schema(
  {
    distributorRecId: {
      type: Schema.Types.ObjectId
    },
    customerRecId: {
      type: Schema.Types.ObjectId
    },
    milkQuantity: {
      type: Number
    },
    orderStatus: {
      type: String
    }
  },
  { timestamps: true }
)

let Order = mongoose.model("orders", OrderSchema, "orders")
module.exports = { Order }
