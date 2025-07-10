const mongoose = require("mongoose");

const transactionLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gateway: {
      type: String,
      enum: ["khalti", "esewa"],
      required: true,
    },
    amount: {
      type: Number, 
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    productId: {
      type: String, 
    },
    refId: {
      type: String, 
    },
    rawResponse: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TransactionLog", transactionLogSchema);
