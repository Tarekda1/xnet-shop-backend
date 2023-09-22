const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true, // Ensure category names are unique
  },
  description: String,
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
