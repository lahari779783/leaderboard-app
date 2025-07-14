const mongoose = require("mongoose");

// User schema to store individual user details
const userSchema = new mongoose.Schema({
  name: {
    type: String, // User's display name
    required: true,
  },
  totalPoints: {
    type: Number, // Total points accumulated through claims
    default: 0, // Starts from 0
  },
});

// Exporting the User model to be used in routes/controllers
module.exports = mongoose.model("User", userSchema);
