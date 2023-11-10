const mongoose = require("mongoose");

// Define the Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  barcode: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  supplier: {
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: Date,
  image: {
    type: String,
  },
});

// Create the Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
