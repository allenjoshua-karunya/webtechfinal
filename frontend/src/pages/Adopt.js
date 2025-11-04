// frontend/src/pages/Adopt.js
import React, { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/Adopt.css";

function Adopt() {
  const [pets, setPets] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await API.get("/animals");
        // show only available ones
        setPets(res.data.filter((p) => p.status === "available"));
      } catch (err) {
        console.error("Failed to load pets", err);
      }
    };
    fetchPets();
  }, []);

  const handleRequestAdopt = async (animalId) => {
    try {
      await API.post("/adoptions", { animalId }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Adoption request sent. Wait for admin approval.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send adoption request");
    }
  };

  return (
    <div className="adopt-container">
      <h2>Available Pets</h2>
      <div className="pet-list">
        {pets.length === 0 && <p>No pets available right now.</p>}
        {pets.map((pet) => (
          <div key={pet._id} className="pet-card">
            <h3>{pet.name}</h3>
            <p>{pet.breed} • {pet.species}</p>
            <p>Age: {pet.ageYears}y {pet.ageMonths}m</p>
            {pet.imageUrl && <img src={pet.imageUrl} alt={pet.name} style={{width: '150px'}} />}
            <button onClick={() => handleRequestAdopt(pet._id)}>Request Adopt</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Adopt;
