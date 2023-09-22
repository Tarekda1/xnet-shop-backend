const express = require("express");
// const { validateCreateProduct } = require("../utils/productValidator");

const router = express.Router();
const authController = require("../controllers/authController");

// login route
router.post(
  "/auth/login",
  // validateCreateProduct,
  authController.login
);

// User signup route
router.post("/auth/signup", authController.signup);

//get all users
router.get("/users", authController.getAllUsers);

//get all users
router.get("/users/:id", authController.getUserById);

//update user
router.put("/users/:id", authController.updateUserById);

module.exports = router;
