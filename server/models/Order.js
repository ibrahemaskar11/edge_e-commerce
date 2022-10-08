const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  ownerId: { type: String, required: true },
  date: { type: String, required: true },
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
  userData: {
    type: {
      phoneNumber: {
        type: String,
        required: false,
        defaultValue: "",
      },
      billingAddress: {
        type: String,
        required: false,
        defaultValue: "",
      },
      city: {
        type: String,
        required: false,
        defaultValue: "",
      },
      postalCode: {
        type: String,
        required: false,
        defaultValue: "",
      },
      email: {
        type: String,
        required: false,
        defaultValue: "",
      },
      username: {
        type: String,
        required: false,
        defaultValue: "",
      },
    },
    required: true,
  },
});
const Order = mongoose.model("order", orderSchema);
module.exports = Order;
