const { body } = require("express-validator");

const validateCreateProduct = [
  body("name").optional().notEmpty().trim(),
  body("description").optional().trim(),
  body("price").optional().isFloat({ min: 0 }),
  body("category")
    .optional()
    .isIn(["Electronics", "Clothing", "Furniture", "Other", "Network"]),
];

module.exports = {
  validateCreateProduct: validateCreateProduct,
};
