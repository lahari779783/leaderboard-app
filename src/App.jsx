// src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import LeaderboardView from "./components/LeaderboardView";
import History from "./components/History";
import "./App.css"; // Global styles including background and responsive layout

function App() {
  // Global UI states
  const [showHistory, setShowHistory] = useState(false); // Toggle between leaderboard and history view
  const [selectedUserId, setSelectedUserId] = useState(""); // Currently selected user for claiming points
  const [refresh, setRefresh] = useState(false); // Used to trigger re-fetch of data when updated

  // Toggle the refresh flag (used by child components to re-fetch data)
  const toggleRefresh = () => setRefresh((prev) => !prev);

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar showHistory={showHistory} setShowHistory={setShowHistory} />

      {/* Main Content Area */}
      <div className="main-content">
        {!showHistory ? (
          <LeaderboardView
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            refresh={refresh}
            onClaimed={toggleRefresh}
          />
        ) : (
          <History refresh={refresh} setShowHistory={setShowHistory} />
        )}
      </div>
    </div>
  );
}

export default App;
