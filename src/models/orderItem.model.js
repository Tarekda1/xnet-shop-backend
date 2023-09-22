const mongoose = require("mongoose");

// Define Order Item Schema (for use in Sales Order)
const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
  },
  quantity: Number,
  // Sales price for this specific item in the order
  salesPrice: Number,
  // Add more order item attributes as needed
});

const OrderItem = mongoose.model("OrderItem", OrderItemSchema);

module.exports = { OrderItem, OrderItemSchema };
