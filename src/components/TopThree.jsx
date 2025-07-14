import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

// Component to display top 3 users based on points
const TopThree = ({ users }) => {
  const [top3, setTop3] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevTop3Ref = useRef([]);
  const { width, height } = useWindowSize(); // For confetti dimensions

  // Watch for changes in the user list and update the top 3 accordingly
  useEffect(() => {
    if (!Array.isArray(users)) return;

    // Sort users by total points and pick top 3
    const sorted = [...users].sort((a, b) => b.totalPoints - a.totalPoints);
    const newTop3 = sorted.slice(0, 3);

    // Detect if the top 3 changed
    const prevIds = prevTop3Ref.current.map((u) => u._id);
    const newIds = newTop3.map((u) => u._id);

    // If rankings changed, celebrate new entrants
    if (prevIds.length > 0 && prevIds.join() !== newIds.join()) {
      const newcomers = newTop3.filter((u) => !prevIds.includes(u._id));
      newcomers.forEach((u) => {
        alert(`🎉 Congrats ${u.name}! You made it to the Top 3!`);
      });

      // Show confetti for 3 seconds
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    // Store new top 3 for future comparison
    prevTop3Ref.current = newTop3;
    setTop3(newTop3);
  }, [users]);

  // Card styles for 1st, 2nd, 3rd positions
  const cardStyles = [
    {
      background: "radial-gradient(circle at top left, #1a1a1a, #000)",
      boxShadow: "0 0 20px 4px rgba(255, 215, 0, 0.4)",
      border: "2px solid #FFD700", // Gold
    },
    {
      background: "radial-gradient(circle at top left, #2a2a2a, #111)",
      boxShadow: "0 0 20px 4px rgba(192, 192, 192, 0.4)",
      border: "2px solid #C0C0C0", // Silver
    },
    {
      background: "radial-gradient(circle at top left, #2e1d0e, #1a0d00)",
      boxShadow: "0 0 20px 4px rgba(205, 127, 50, 0.4)",
      border: "2px solid #CD7F32", // Bronze
    },
  ];

  return (
    <>
      {showConfetti && <Confetti width={width} height={height} />}

      <h2 style={{ textAlign: "center", color: "#fff", marginTop: "2rem" }}>
        🏆 Top 3 Performers
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          marginTop: "1rem",
        }}
      >
        {top3.map((user, idx) => (
          <motion.div
            key={user._id}
            layout
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              ...cardStyles[idx],
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              color: "#000",
              boxShadow: "0 0 12px rgba(255, 255, 255, 0.2)",
              position: "relative",
              textAlign: "center",
            }}
          >
            {/* Medal emoji at top */}
            <div
              style={{ position: "absolute", top: "10px", fontSize: "1.8rem" }}
            >
              {["🥇", "🥈", "🥉"][idx]}
            </div>

            {/* Avatar Placeholder */}
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: `url("/avatar.jpeg") no-repeat center/cover`,
                marginTop: "1.5rem",
                marginBottom: "0.5rem",
                boxShadow: "inset 0 0 5px #000",
              }}
            />

            {/* Name with badge */}
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "#fff700",
                textShadow: "0 0 5px #fff700, 0 0 10px #ffcc00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              {["👑", "🚀", "🌟"][idx]} {user.name}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default TopThree;
