const Supplier = require("../models/supplier.model"); // Import the Supplier model

// Create a new supplier
// router.post("/suppliers",
async function createSupplier(req, res) {
  try {
    const newSupplier = new Supplier(req.body);
    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all suppliers
// router.get("/suppliers"
async function getAllSuppliers(req, res) {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a single supplier by ID
// router.get("/suppliers/:id"
async function getSupplierById(req, res) {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      res.status(404).json({ error: "Supplier not found" });
    } else {
      res.status(200).json(supplier);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a supplier by ID
// router.put("/suppliers/:id",
async function updateSupplierById(req, res) {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSupplier) {
      res.status(404).json({ error: "Supplier not found" });
    } else {
      res.status(200).json(updatedSupplier);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a supplier by ID
// router.delete("/suppliers/:id",
async function deleteSupplierById(req, res) {
  try {
    const deletedSupplier = await Supplier.findByIdAndRemove(req.params.id);
    if (!deletedSupplier) {
      res.status(404).json({ error: "Supplier not found" });
    } else {
      res.status(204).send(); // 204 No Content
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createSupplier: createSupplier,
  getAllSuppliers: getAllSuppliers,
  getSupplierById: getSupplierById,
  updateSupplierById: updateSupplierById,
  deleteSupplierById: deleteSupplierById,
};
