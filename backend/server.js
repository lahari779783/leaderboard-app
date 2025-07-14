const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const User = require("./models/User");
const ClaimHistory = require("./models/ClaimHistory");

const app = express();

// Middlewares to allow JSON parsing and handle CORS
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// GET all users sorted by totalPoints (Leaderboard)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Add a new user to the database
app.post("/api/users", async (req, res) => {
  try {
    const { name } = req.body;
    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Claim random points (1 to 10) for a user by ID
app.post("/api/claim", async (req, res) => {
  try {
    const { userId } = req.body;
    const points = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.totalPoints += points;
    await user.save();

    // Save to claim history
    const claim = new ClaimHistory({ user: userId, points });
    await claim.save();

    res.json({ message: "Points claimed", user, points });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - All claim history (latest first)
app.get("/api/claims", async (req, res) => {
  try {
    const claims = await ClaimHistory.find()
      .populate("user", "name")
      .sort({ timestamp: -1 });
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Leaderboard (same as /api/users)
app.get("/api/leaderboard", async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Clear all claim history
app.delete("/api/history", async (req, res) => {
  try {
    await ClaimHistory.deleteMany({});
    res.json({ message: "All history deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Remove all users (for reset/testing)
app.delete("/api/users", async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All users deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete users" });
  }
});

// POST - Seed 10 fixed users with emojis (for quick setup)
app.post("/api/users/seed", async (req, res) => {
  const sampleUsers = [
    { name: "🚀 Aryan" },
    { name: "🎯 Sneha" },
    { name: "🔥 Raj" },
    { name: "🌟 Ananya" },
    { name: "⚡ Dev" },
    { name: "🎮 Neha" },
    { name: "🧠 Rohan" },
    { name: "🎉 Tanya" },
    { name: "📘 Vivek" },
    { name: "🎵 Aisha" },
  ];

  try {
    await User.insertMany(sampleUsers);
    res.json({ message: "10 users added" });
  } catch (err) {
    res.status(500).json({ error: "Failed to seed users" });
  }
});

// GET - Complete claim history for all users
app.get("/api/history", async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .populate("user", "name")
      .sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on PORT ${PORT}`);
});
