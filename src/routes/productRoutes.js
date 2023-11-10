// routes/taskRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path"); // For working with file paths
const fs = require("fs"); // For working with the file system
const { validateCreateProduct } = require("../utils/productValidator");

const router = express.Router();
const productController = require("../controllers/productsController");
const { requireAuth } = require("../middleware/authMiddleware");

if (!fs.existsSync(path.join(__dirname, "uploads"))) {
  fs.mkdirSync(path.join(__dirname, "../../", "uploads"));
}

// Define the storage engine for Multer to store uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../", "uploads/")); // Specify the directory where images will be saved
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + extname); // Use a unique filename for each uploaded image
  },
});
const upload = multer({ storage });

// Get all products
router.get("/products", requireAuth, productController.getAllProducts);

// Get product by id
router.get("/products/search", requireAuth, productController.searchProducts);

// Get product by id
router.get("/products/:id", requireAuth, productController.getProductById);

// Update product by id
router.put(
  "/products/:id",
  upload.single("image"),
  requireAuth,
  productController.updateProductById
);

// delete product by id
router.delete(
  "/products/:id",
  requireAuth,
  productController.deleteProductById
);

// Create a new product
router.post(
  "/products",
  validateCreateProduct,
  upload.single("image"),
  productController.createProduct
);

module.exports = router;
