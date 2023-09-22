const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const supplierRoutes = require("./routes/supplier");
const inventoryRoutes = require("./routes/inventoryRoutes");
const salesOrderRoutes = require("./routes/salesOrderRoutes");
const authRoutes = require("./routes/authRoutes");
const database = require("./config/database");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

try {
  database.connectDb();
} catch (error) {
  throw error;
}

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    // Check database connectivity
    await mongoose.connection.db.admin().ping();

    // Check CPU and memory usage (for demonstration purposes, use artificial thresholds)
    const cpuUsage = 80; // Simulate high CPU usage (above 80%)
    const memoryUsage = 85; // Simulate high memory usage (above 85%)

    if (cpuUsage > 80 || memoryUsage > 85) {
      throw new Error("High CPU or memory usage");
    }

    // Simulate checking an external service (replace with actual service check)
    const externalServiceResponse = await checkExternalService();

    // If all checks pass, respond with a healthy status
    res.status(200).json({ status: "Healthy", message: "All checks passed" });
  } catch (error) {
    // If any check fails, respond with an unhealthy status and error details
    res.status(500).json({ status: "Unhealthy", error: error.message });
  }
});

// Simulated external service check (replace with actual service check)
async function checkExternalService() {
  // Simulate a request to an external service (e.g., an API)
  // Replace this with the actual check for the external service's health
  return new Promise((resolve, reject) => {
    // For demonstration purposes, simulate a successful response
    setTimeout(() => {
      resolve("External service is operational");
    }, 1000);
  });
}

// Serve uploaded files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "../", "uploads")));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to my Node.js API!");
});

//use the authentication route
app.use("/api", authRoutes);

// Use the rpoducts routes
app.use("/api", productRoutes);
//use the catgory routes
app.use("/api", categoryRoutes);
//use the supplier routes
app.use("/api", supplierRoutes);
app.use("/api", inventoryRoutes);
app.use("/api", salesOrderRoutes);

// app.post("/api/users", (req, res) => {
//   const newUser = req.body;
//   // Here, you could save the new user to a database.
//   res.status(201).json(newUser);
// });

module.exports = app;
