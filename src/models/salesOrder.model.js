const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const OrderItemSchema = require("./orderItem.model").OrderItemSchema;

var CounterSchema = mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
var counter = mongoose.model("counter", CounterSchema);

// Define Sales Order Schema
const SalesOrderSchema = mongoose.Schema({
  customer: String, // Replace with a reference to a Customer model if available
  items: [OrderItemSchema], // Array of order items
  status: {
    type: String,
    enum: ["pending", "paid"],
    default: "paid",
  },
  orderId: Number, // Number of
  // Add more sales order attributes as needed
});

SalesOrderSchema.pre("save", function (next) {
  var doc = this;
  counter
    .findByIdAndUpdate(
      { _id: "entityId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    )
    .then((count) => {
      doc.orderId = count.seq;
      next();
    })
    .catch(function (err) {
      console.error("counter error-> : " + err);
      throw error;
    });
});

const SalesOrder = mongoose.model("SalesOrder", SalesOrderSchema);

module.exports = { SalesOrder, OrderItemSchema };

//AutoIncrement.initialize(mongoose.connection);
