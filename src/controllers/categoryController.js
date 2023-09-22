// controllers/taskController.js
const Category = require("../models/category.model");
const { validationResult } = require("express-validator");

// Get all tasks
function getAllCategories(req, res) {
  Category.find({})
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

//get by id
async function getCategoryById(req, res) {
  try {
    const prod = await Product.findById(req?.params?.id);
    res.status(200).json(prod);
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
}

// Create a new task
async function createCategory(req, res) {
  // validate through express validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newProduct = new Product(req.body);

  try {
    const resp = await newProduct.save();
    res.status(201).json(resp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// update product by id
async function updateCategoryById(req, res) {
  try {
    console.log(req.params.id);
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(updated);
    if (updated !== null) {
      res.status(200).json(updated);
    } else {
      res.status(400).json({ error: "Unknown error" });
    }
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
}

// delete product by id
function deleteCategoryById(req, res) {
  Product.findByIdAndRemove(req.params.id, (err, product) => {
    if (err) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(204).send(); // 204 No Content
    }
  });
}

module.exports = {
  getAllCategories: getAllCategories,
  getCategoryById: getCategoryById,
  createCategory: createCategory,
  updateCategoryById: updateCategoryById,
  deleteCategoryById: deleteCategoryById,
};
