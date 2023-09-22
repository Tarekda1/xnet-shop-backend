const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URI } = process.env; // Your MongoDB connection string

function connectDb() {
  if (!MONGO_URI) {
    throw new Error("MongoDB connection string is not provided.");
  }

  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
      throw error;
    });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB error:", error);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });
}

// Export the mongoose instance to be used throughout the application
module.exports = {
  connectDb: connectDb,
};
