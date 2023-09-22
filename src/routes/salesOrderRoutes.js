const express = require("express");
const router = express.Router();
const salesOrderController = require("../controllers/salesOrderController");

// Create a new sales order
router.post("/sales-orders", salesOrderController.createSalesOrder);

// Get a list of all sales orders
router.get("/sales-orders", salesOrderController.getSalesOrders);

// Get a single sales order by ID
router.get(
  "/sales-orders/:salesOrderId",
  salesOrderController.getSalesOrderById
);

// Update a sales order by ID
router.put(
  "/sales-orders/:salesOrderId",
  salesOrderController.updateSalesOrder
);

// Delete a sales order by ID
router.delete(
  "/sales-orders/:salesOrderId",
  salesOrderController.deleteSalesOrder
);

module.exports = router;
