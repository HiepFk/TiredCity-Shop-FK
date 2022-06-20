const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        // product: {
        //   type: mongoose.Schema.ObjectId,
        //   ref: "Product",
        //   require: true,
        // },
        name: String,
        price: Number,
        image: String,
        amount: {
          type: Number,
        },
        color: {
          type: String,
          enum: ["white", "black"],
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
    address: { type: String, required: true },
    status: { type: String, default: "pending" },
    time: {
      type: Date,
      default: new Date(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
