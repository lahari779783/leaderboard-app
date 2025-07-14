// src/components/LeaderboardView.jsx
import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";
import ClaimButton from "./ClaimButton";
import TopThree from "./TopThree";
import UserListAnimated from "./UserListAnimated";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const LeaderboardView = ({
  selectedUserId,
  setSelectedUserId,
  refresh,
  onClaimed,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [users, setUsers] = useState([]);
  const { width, height } = useWindowSize();

  // 🎉 Trigger celebration effect
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Load users when the component mounts or refresh flag changes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://leaderboard-app-yd8v.onrender.com/api/users"
        );
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [refresh]);

  return (
    <div className="leaderboard-view">
      {/* Confetti animation when triggered */}
      {showConfetti && <Confetti width={width} height={height} />}

      <h1 className="main-heading">🏆 Leaderboard</h1>

      {/* Add new user + Claim points section */}
      <div className="top-section">
        <AddUser onUserAdded={onClaimed} />
        <ClaimButton selectedUserId={selectedUserId} onClaimed={onClaimed} />
      </div>

      {/* Display top 3 users with special styling */}
      <TopThree users={users} onCelebrate={triggerConfetti} />

      {/* Show complete user list with dynamic selection */}
      <UserListAnimated
        users={users}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        refresh={refresh}
      />
    </div>
  );
};

export default LeaderboardView;
