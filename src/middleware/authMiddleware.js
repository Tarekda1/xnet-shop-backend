const jwt = require("jsonwebtoken");
const { expressjwt: jwtVerifier } = require("express-jwt");

// Replace 'your-secret-key' with your actual secret key
const secretKey = "my-key";

// Generate an access token
function generateAccessToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "15m" }); // Access token expires in 15 minutes
}

// Generate a refresh token
function generateRefreshToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "7d" }); // Refresh token expires in 7 days
}

// Middleware to protect routes with JWT authentication
const requireAuth = jwtVerifier({ secret: secretKey, algorithms: ["HS256"] });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  requireAuth,
};
