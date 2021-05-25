const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const paypalSchema = new mongoose.Schema(
  {
    customerID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: Object,
      required: true,
    },
    paymentID: {
      type: String,
      required: true,
    },
    stateOrder: {
      type: String,
      enum: ["shipped", "charged", "delivered"],
      default: "shipped",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PaymentGetaway", paypalSchema);
