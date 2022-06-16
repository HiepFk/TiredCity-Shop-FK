const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Prodcut",
          require: true,
        },
        quantity: {
          type: Number,
        },
        color: {
          type: String,
          enum: ["white , black"],
        },
        size: {
          type: String,
          enum: ["S", "M", "L", "XL", "XXL"],
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    },
    totalQty: {
      type: Number,
      default: 0,
      required: true,
    },
    totalCost: {
      type: Number,
      default: 0,
      required: true,
    },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
