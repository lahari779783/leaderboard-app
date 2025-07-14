// Component responsible for claiming random points for the selected user
const ClaimButton = ({ selectedUserId, onClaimed }) => {
  // Function to handle the "Claim Points" button click
  const handleClaim = async () => {
    // Prevent claiming if no user is selected
    if (!selectedUserId) {
      alert("Please select a user first.");
      return;
    }

    try {
      // Send POST request to claim random points for the selected user
      const res = await fetch("http://localhost:5000/api/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: selectedUserId }),
      });

      const data = await res.json();

      // Show success message with awarded points
      alert(`🎉 Congrats ${data.user.name}! Got ${data.points} points!`);

      // Trigger parent update (e.g., refresh leaderboard)
      onClaimed();
    } catch (err) {
      console.error("Error claiming points:", err);
    }
  };

  return (
    <button onClick={handleClaim} className="btn-green">
      Claim Points
    </button>
  );
};

export default ClaimButton;
