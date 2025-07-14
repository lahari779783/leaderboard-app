// Component responsible for claiming random points for the selected user
const ClaimButton = ({ selectedUserId, onClaimed }) => {
  const handleClaim = async () => {
    if (!selectedUserId) {
      alert("Please select a user first.");
      return;
    }

    try {
      const res = await fetch(
        "https://leaderboard-app-yd8v.onrender.com/api/claim",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: selectedUserId }),
        }
      );

      const data = await res.json();
      alert(`🎉 Congrats ${data.user.name}! Got ${data.points} points!`);
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
