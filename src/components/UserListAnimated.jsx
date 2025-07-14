// src/components/UserListAnimated.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Component to render animated leaderboard with user dropdown
const UserListAnimated = ({ selectedUserId, setSelectedUserId, refresh }) => {
  const [users, setUsers] = useState([]);

  // Fetch users on mount and whenever `refresh` changes (e.g. after claiming points)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        const data = await res.json();
        const sorted = data.sort((a, b) => b.totalPoints - a.totalPoints);
        setUsers(sorted);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [refresh]);

  return (
    <div>
      {/* Dropdown for selecting a user */}
      <div
        style={{
          padding: "0.6rem 1rem",
          borderRadius: "8px",
          border: "2px solid #00bcd4",
          backgroundColor: "#111",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <label htmlFor="userDropdown">Select User: </label>
        <select
          id="userDropdown"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="dropdown"
        >
          <option value="">-- Choose User --</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Leaderboard section with animation */}
      <h2>🏅 Full Leaderboard</h2>
      <AnimatePresence>
        {users.map((user, index) => (
          <motion.div
            key={user._id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: selectedUserId === user._id ? "#ffeb3b33" : "#1e1e1e",
              border: "1px solid #444",
              padding: "12px 20px",
              borderRadius: "10px",
              margin: "8px 0",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              color: "#fff",
            }}
          >
            <strong>#{index + 1}</strong>
            <span>{user.name}</span>
            <span>{user.totalPoints} pts</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default UserListAnimated;
