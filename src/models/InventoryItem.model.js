const mongoose = require("mongoose");

// Define Inventory Item Schema
const InventoryItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
  },
  quantity: {
    type: Number,
    default: 1,
  },
  location: String,
  sellingPrice: Number,
  status: {
    type: String,
    enum: ["available", "reserved", "sold"],
    default: "available",
  },
  // Add more inventory item attributes as needed
});

const InventoryItem = mongoose.model("InventoryItem", InventoryItemSchema);

module.exports = InventoryItem;
