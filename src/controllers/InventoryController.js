const InventoryItem = require("../models/InventoryItem.model");

// Create a new inventory item
const createInventoryItem = async (req, res) => {
  try {
    const inventoryItem = new InventoryItem(req.body);
    await inventoryItem.save();
    res.status(201).json(inventoryItem);
  } catch (error) {
    res.status(500).json({ error: "Error creating inventory item" });
  }
};

// Get a single inventory item by ID
const getInventoryItemById = async (req, res) => {
  try {
    const inventoryItemId = req.params.inventoryItemId;
    const inventoryItem = await InventoryItem.findById(inventoryItemId);

    if (!inventoryItem) {
      return res.status(404).json({ error: "Inventory item not found" });
    }

    res.json(inventoryItem);
  } catch (error) {
    res.status(500).json({ error: "Error fetching inventory item" });
  }
};

// Get a list of all inventory items
const getInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await InventoryItem.find().populate("product");
    res.json(inventoryItems);
  } catch (error) {
    res.status(500).json({ error: "Error fetching inventory items" });
  }
};

// Update an inventory item by ID
const updateInventoryItem = async (req, res) => {
  try {
    const inventoryItemId = req.params.inventoryItemId;
    const updatedInventoryItem = await InventoryItem.findByIdAndUpdate(
      inventoryItemId,
      req.body,
      { new: true }
    );

    if (!updatedInventoryItem) {
      return res.status(404).json({ error: "Inventory item not found" });
    }

    res.json(updatedInventoryItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating inventory item" });
  }
};

// Delete an inventory item by ID
const deleteInventoryItem = async (req, res) => {
  try {
    const inventoryItemId = req.params.inventoryItemId;
    const deletedInventoryItem = await InventoryItem.findByIdAndRemove(
      inventoryItemId
    );

    if (!deletedInventoryItem) {
      return res.status(404).json({ error: "Inventory item not found" });
    }

    res.json(deletedInventoryItem);
  } catch (error) {
    res.status(500).json({ error: "Error deleting inventory item" });
  }
};

module.exports = {
  createInventoryItem,
  getInventoryItems,
  getInventoryItemById,
  updateInventoryItem,
  deleteInventoryItem,
};
