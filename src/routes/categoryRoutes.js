// routes/taskRoutes.js
const express = require("express");
// const { validateCreateProduct } = require("../utils/productValidator");

const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Get all catgories
router.get("/categories", categoryController.getAllCategories);

// Get category by id
router.get("/categories/:id", categoryController.getCategoryById);

// Update category by id
router.put("/categories/:id", categoryController.updateCategoryById);

// Create a new category
router.post(
  "/categories",
  // validateCreateProduct,
  categoryController.createCategory
);

module.exports = router;
