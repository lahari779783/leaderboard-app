import { useState } from "react";

const AddUser = ({ onUserAdded }) => {
  // State to hold user input and submission status
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return; // Prevent empty submissions

    setIsSubmitting(true);
    try {
      // API call to add a new user
      const res = await fetch("https://leaderboard-api-abc123.onrender.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Failed to add user");

      // Refresh user list in parent component
      onUserAdded();
      setName(""); // Reset input field
    } catch (error) {
      alert("Error adding user. Please try again.");
      console.error("Add user error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: "20px", display: "flex", gap: "10px" }}
    >
      {/* Input field for user name */}
      <input
        type="text"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          flex: 1,
        }}
      />

      {/* Submit button */}
      <button type="submit" disabled={isSubmitting} className="btn-green">
        {isSubmitting ? "Adding..." : "Add User"}
      </button>
    </form>
  );
};

export default AddUser;
