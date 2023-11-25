// controllers/taskController.js
const path = require("path");
const Product = require("../models/product.model");
const InventoryItem = require("../models/InventoryItem.model");

const { validationResult } = require("express-validator");

const pageSize = 100;

// Get all tasks
async function getAllProducts(req, res) {
  const page = parseInt(req.query.page, 10) || 1;

  try {
    const products = await Product.find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      totalPages: Math.ceil(totalProducts / pageSize),
      products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get products count
async function getAllProductsCount(req, res) {
  try {
    const productsCount = await Product.count();
    res.status(200).json({
      totalProducts: productsCount,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function searchProducts(req, res) {
  console.log(req.query);
  const searchText = req.query.searchterm;
  console.log(searchText);

  try {
    if (searchText !== "") {
      const products = await Product.find({
        name: { $regex: searchText, $options: "i" },
      });
      res.status(200).json({ totalPages: 1, products });
    } else {
      const page = 1;
      const products = await Product.find({})
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      const totalProducts = await Product.countDocuments();

      res.status(200).json({
        totalPages: Math.ceil(totalProducts / pageSize),
        products,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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

//get last 5 products added
async function getProductLastProducsAdded(req, res) {
  try {
    const prod = await Product.find().sort({ $natural: -1 }).limit(5);
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
  console.log(req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newProduct = new Product(req.body);

  // console.log(req);

  if (req.file) {
    // If an image was uploaded, save its URL
    newProduct.image =
      `http://localhost:${process.env.PORT}/uploads/` + req.file.filename; // Assuming your server serves static files from the 'uploads' directory
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
    const product = await Product.findById(req.params.id);

    const image = product.image;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image },
      {
        new: true,
      }
    );

    console.log(req.file);
    console.log(updated.image);

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
async function deleteProductById(req, res) {
  try {
    const resp = await Product.findByIdAndRemove(req.params.id);
    console.log(resp);
    if (resp.error) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json({ status: 204, success: "ok" }); // 204 No Content
    }
  } catch (error) {
    res.status(400).send({ status: 400, success: "ok" }); // 204 No Content
  }
}

module.exports = {
  getAllProducts: getAllProducts,
  getProductById: getProductById,
  createProduct: createProduct,
  updateProductById: updateProductById,
  deleteProductById: deleteProductById,
  getProductByBarCode: getProductByBarCode,
  searchProducts: searchProducts,
  getAllProductsCount: getAllProductsCount,
  getProductLastProducsAdded: getProductLastProducsAdded,
};
