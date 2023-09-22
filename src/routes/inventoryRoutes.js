const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/InventoryController");

// Create a new inventory item
router.post("/inventory", inventoryController.createInventoryItem);

// Get a list of all inventory items
router.get("/inventory", inventoryController.getInventoryItems);

// Get a single inventory item by ID
router.get(
  "/inventory/:inventoryItemId",
  inventoryController.getInventoryItemById
);

// Update an inventory item by ID
router.put(
  "/inventory/:inventoryItemId",
  inventoryController.updateInventoryItem
);

// Delete an inventory item by ID
router.delete(
  "/inventory/:inventoryItemId",
  inventoryController.deleteInventoryItem
);

module.exports = router;
