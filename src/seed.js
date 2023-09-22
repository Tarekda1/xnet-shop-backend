// seed.js

const mongoose = require("mongoose");
const Product = require("./models/product.model"); // Import your model
const Catgory = require("./models/category.model");

// Connect to MongoDB
mongoose.connect("mongodb://localhost/xnet-shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the initial data
const initialCategoryData = [
  {
    categoryName: "Category 1",
    description: "some description",
  },
  {
    categoryName: "Category 2",
    description: "some description",
  },
  // Add more objects as needed
];

// Define the initial data
const initialProductData = [
  {
    productName: "Product 1",
    barCode: "1241212",
    price: 10,
    quantityInStock: 1,
  },
  {
    productName: "Product 2",
    barCode: "1241212",
    price: 20,
    quantityInStock: 1,
  },
  // Add more objects as needed
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Remove existing data
    await Catgory.deleteMany({});

    // Insert the initial data
    await Catgory.insertMany(initialCategoryData);

    // Remove existing data
    await Product.deleteMany({});

    // Insert the initial data
    await Product.insertMany(initialProductData);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
};

// Call the seedDatabase function
seedDatabase();
