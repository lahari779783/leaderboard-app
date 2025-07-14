import React, { useEffect, useState } from "react";

const History = ({ refresh, setShowHistory }) => {
  const [history, setHistory] = useState([]);

  // Fetch claim history from the server
  const fetchHistory = async () => {
    try {
      const res = await fetch(
        "https://leaderboard-app-yd8v.onrender.com/api/history"
      );
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  // Clear entire history from DB and state
  const clearHistory = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all history?"
    );
    if (!confirmClear) return;

    try {
      await fetch("https://leaderboard-app-yd8v.onrender.com/api/history", {
        method: "DELETE",
      });
      setHistory([]); // Clear UI after DB is cleared
    } catch (err) {
      console.error("Error clearing history:", err);
    }
  };

  // Fetch history whenever 'refresh' changes
  useEffect(() => {
    fetchHistory();
  }, [refresh]);

  return (
    <div
      id="history"
      style={{
        marginTop: "2rem",
        backgroundColor: "#1c1c1c",
        padding: "1.5rem",
        borderRadius: "12px",
        color: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      {/* Clear History Button (shown only if history exists) */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#e53935",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🗑️ Clear History
          </button>
        )}
      </div>

      {/* Heading */}
      <h2 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>
        📜 Claim History
      </h2>

      {/* History Table */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#2b2b2b",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#444" }}>
              <th style={{ padding: "12px", textAlign: "left" }}>👤 User</th>
              <th style={{ padding: "12px", textAlign: "left" }}>✨ Points</th>
              <th style={{ padding: "12px", textAlign: "left" }}>
                ⏱ Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr
                key={entry._id}
                style={{
                  borderBottom: "1px solid #444",
                  transition: "background 0.3s",
                }}
              >
                <td style={{ padding: "10px" }}>
                  {entry.user?.name || "Unknown"}
                </td>
                <td style={{ padding: "10px" }}>{entry.points}</td>
                <td style={{ padding: "10px" }}>
                  {new Date(entry.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
