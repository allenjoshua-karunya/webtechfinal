import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserHome.css";

const UserHome = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Welcome to FurEverHome</h2>
      <p>What would you like to do today?</p>

      <div style={{ marginTop: "40px" }}>
        <button
          onClick={() => navigate("/adopt")}
          style={{
            padding: "10px 25px",
            marginRight: "20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Adopt a Pet
        </button>

        <button
          onClick={() => navigate("/mypets")}
          style={{
            padding: "10px 25px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#2196F3",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          My Adopted Pets
        </button>
      </div>
    </div>
  );
};

export default UserHome;
