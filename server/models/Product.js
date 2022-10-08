const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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
});
const Product = mongoose.model("item", productSchema);
exports.productSchema
module.exports = Product;
