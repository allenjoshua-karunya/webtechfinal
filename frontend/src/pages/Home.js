import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>🐾 Welcome to FurEverHome 🏠</h1>
      <p>
        Adopt, love, and give a furry friend a forever home.  
        Browse pets up for adoption or manage them as an admin.
      </p>

      <div className="home-buttons">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn">Signup</Link>
      </div>
    </div>
  );
}

export default Home;
