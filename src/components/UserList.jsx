import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Component to display leaderboard and user selection dropdown
const UserList = ({ selectedUserId, setSelectedUserId, refresh }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from backend and sort them by points
    const fetchUsers = async () => {
      try {
        const res = await  fetch("https://leaderboard-app-yd8v.onrender.com/api/users", 
        );
        const data = await res.json();
        const sorted = data.sort((a, b) => b.totalPoints - a.totalPoints);
        setUsers(sorted);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [refresh]); // Re-fetch users when refresh is triggered (e.g. after claim)

  return (
    <div>
      {/* Dropdown section to select a user */}
      <div style={{ marginBottom: "20px" }}>
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

      {/* Animated Leaderboard List */}
      <h2>🏅 Leaderboard</h2>
      <AnimatePresence>
        {users.map((user, index) => (
          <motion.div
            key={user._id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: selectedUserId === user._id ? "#e0f7fa" : "#ffffff",
              border: "1px solid #ddd",
              padding: "10px 20px",
              borderRadius: "8px",
              margin: "10px 0",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
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

export default UserList;
