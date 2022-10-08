const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  ownerId: { type: String, required: true },
  items: [
    {
      type: {
        availableSizes: {
          type: [{ type: String }],
        },
        category: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        subCategory: {
          type: String,
          required: true,
        },
        availableColors: {
          type: [{ type: String }],
        },

        images: {
          type: [{ type: String }],
        },
        itemName: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        amount: {
          type: Number,
          default: 1,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        cartId: {
          type: String,
          required: true,
        },
      },
    },
  ],
  totalAmount: { type: Number, default: 0 },
  totalItems: { type: Number, default: 0 },
});
const Cart = mongoose.model("cart", cartSchema);
exports.cartSchema;
module.exports = Cart;
