const mongoose = require("mongoose");
const orderItemSchema = require("./orderItem.model").OrderItemSchema;

// Define Sales Order Schema
const SalesOrderSchema = new mongoose.Schema({
  customer: String, // Replace with a reference to a Customer model if available
  items: [orderItemSchema], // Array of order items
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  // Add more sales order attributes as needed
});

const SalesOrder = mongoose.model("SalesOrder", SalesOrderSchema);

module.exports = { SalesOrder, SalesOrderSchema };
