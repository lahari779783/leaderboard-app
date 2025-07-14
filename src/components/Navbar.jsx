/// src/components/Navbar.jsx
import React from "react";

// Navbar component to toggle between Leaderboard view and History view
const Navbar = ({ showHistory, setShowHistory }) => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#222",
        color: "white",
        borderBottom: "2px solid #444",
      }}
    >
      {/* Logo/Title */}
      <h1>🏆 Leaderboard</h1>

      {/* Toggle button to switch views */}
      <button
        onClick={() => setShowHistory((prev) => !prev)}
        style={{
          backgroundColor: "#00bcd4",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          color: "white",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {showHistory ? "🏆 View Leaderboard" : "📜 View History"}
      </button>
    </nav>
  );
};

export default Navbar;
