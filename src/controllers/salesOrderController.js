const { SalesOrder, OrderItem } = require("../models/salesOrderItem.model");

// Create a new sales order
const createSalesOrder = async (req, res) => {
  try {
    const { customer, items } = req.body;

    // Create order items from the provided items array
    const orderItems = await OrderItem.create(items);

    // Create a new sales order and associate the order items
    const salesOrder = new SalesOrder({
      customer,
      items: orderItems.map((item) => item._id),
    });
    await salesOrder.save();

    res.status(201).json(salesOrder);
  } catch (error) {
    res.status(500).json({ error: "Error creating sales order" });
  }
};

// Get a list of all sales orders
const getSalesOrders = async (req, res) => {
  try {
    const salesOrders = await SalesOrder.find().populate("items");
    res.json(salesOrders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sales orders" });
  }
};

// Get a single sales order by ID
const getSalesOrderById = async (req, res) => {
  try {
    const salesOrderId = req.params.salesOrderId;
    const salesOrder = await SalesOrder.findById(salesOrderId).populate(
      "items"
    );

    if (!salesOrder) {
      return res.status(404).json({ error: "Sales order not found" });
    }

    res.json(salesOrder);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sales order" });
  }
};

// Update a sales order by ID
const updateSalesOrder = async (req, res) => {
  try {
    const salesOrderId = req.params.salesOrderId;
    const { customer, items } = req.body;

    // Find and update the sales order
    const updatedSalesOrder = await SalesOrder.findByIdAndUpdate(
      salesOrderId,
      { customer },
      { new: true }
    );

    if (!updatedSalesOrder) {
      return res.status(404).json({ error: "Sales order not found" });
    }

    // Delete existing order items associated with the sales order
    await OrderItem.deleteMany({ _id: { $in: updatedSalesOrder.items } });

    // Create new order items from the provided items array
    const orderItems = await OrderItem.create(items);

    // Update the sales order with the new order items
    updatedSalesOrder.items = orderItems.map((item) => item._id);
    await updatedSalesOrder.save();

    res.json(updatedSalesOrder);
  } catch (error) {
    res.status(500).json({ error: "Error updating sales order" });
  }
};

// Delete a sales order by ID
const deleteSalesOrder = async (req, res) => {
  try {
    const salesOrderId = req.params.salesOrderId;
    const deletedSalesOrder = await SalesOrder.findByIdAndRemove(salesOrderId);

    if (!deletedSalesOrder) {
      return res.status(404).json({ error: "Sales order not found" });
    }

    res.json(deletedSalesOrder);
  } catch (error) {
    res.status(500).json({ error: "Error deleting sales order" });
  }
};

module.exports = {
  createSalesOrder,
  getSalesOrders,
  getSalesOrderById,
  updateSalesOrder,
  deleteSalesOrder,
};
