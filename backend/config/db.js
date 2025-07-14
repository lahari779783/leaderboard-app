const mongoose = require("mongoose");

// Function to connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    // Attempt to connect to the database using the URI from .env file
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // optional (deprecated in latest versions)
      useUnifiedTopology: true, // optional (deprecated in latest versions)
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    // Log the error and exit the process if connection fails
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
