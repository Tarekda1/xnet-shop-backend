// routes/taskRoutes.js
const express = require("express");
// const { validateCreateProduct } = require("../utils/productValidator");

const router = express.Router();
const utilController = require("../controllers/utilController");

// Get all suppliers
router.get("/util/datetime", utilController.getDateTime);


module.exports = router;
