const mongoose = require("mongoose");

// Schema to track the history of claimed points by users
const claimHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // References the User model
    ref: "User",
    required: true,
  },
  points: {
    type: Number, // Number of points claimed
    required: true,
  },
  timestamp: {
    type: Date, // Time when the claim was made
    default: Date.now, // Defaults to current date/time
  },
});

// Exporting the ClaimHistory model
module.exports = mongoose.model("ClaimHistory", claimHistorySchema);
