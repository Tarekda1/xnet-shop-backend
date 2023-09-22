// routes/taskRoutes.js
const express = require("express");
// const { validateCreateProduct } = require("../utils/productValidator");

const router = express.Router();
const supplierController = require("../controllers/supplierController");

// Get all suppliers
router.get("/suppliers", supplierController.getAllSuppliers);

// Get supplier by id
router.get("/suppliers/:id", supplierController.getSupplierById);

// Update supplier by id
router.put("/suppliers/:id", supplierController.updateSupplierById);

// Create a new supplier
router.post(
  "/suppliers",
  // validateCreateProduct,
  supplierController.createSupplier
);

module.exports = router;
