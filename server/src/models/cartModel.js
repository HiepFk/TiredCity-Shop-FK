const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
