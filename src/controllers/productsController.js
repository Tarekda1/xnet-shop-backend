// controllers/taskController.js
const path = require("path");
const Product = require("../models/product.model");
const InventoryItem = require("../models/InventoryItem.model");

const { validationResult } = require("express-validator");

// Get all tasks
function getAllProducts(req, res) {
  Product.find({})
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

//get by id
async function getProductById(req, res) {
  try {
    const prod = await Product.findById(req?.params?.id);
    res.status(200).json(prod);
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
}

//get by barcode
async function getProductByBarCode(req, res) {
  try {
    const prod = await Product.find({ barCode: { $eq: req?.query.barCode } });
    res.status(200).json(prod);
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
}

// Create a new task
async function createProduct(req, res) {
  // validate through express validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newProduct = new Product(req.body);

  // console.log(req);

  if (req.file) {
    // If an image was uploaded, save its URL
    newProduct.image = "http://localhost:4000/uploads/" + req.file.filename; // Assuming your server serves static files from the 'uploads' directory
  }

  try {
    const newProductModel = await newProduct.save();

    const newInventoryItem = new InventoryItem({
      product: newProductModel._id,
      quantity: 0,
    });

    // Save the inventory item to the database
    await newInventoryItem.save();

    res.status(201).json(newProductModel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// update product by id
async function updateProductById(req, res) {
  try {
    console.log(req.params.id);
    console.log(req.body);
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (req.file) {
      // If an image was uploaded, save its URL
      updated.image = "http://localhost:4000/uploads/" + req.file.filename; // Assuming your server serves static files from the 'uploads' directory
    }

    await updated.save();

    console.log(updated);
    if (updated !== null) {
      res.status(200).json(updated);
    } else {
      res.status(400).json({ error: "Unknown error" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Product not found" });
  }
}

// delete product by id
function deleteProductById(req, res) {
  Product.findByIdAndRemove(req.params.id, (err, product) => {
    if (err) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(204).send(); // 204 No Content
    }
  });
}

module.exports = {
  getAllProducts: getAllProducts,
  getProductById: getProductById,
  createProduct: createProduct,
  updateProductById: updateProductById,
  deleteProductById: deleteProductById,
  getProductByBarCode: getProductByBarCode,
};
