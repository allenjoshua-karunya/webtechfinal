// frontend/src/pages/MyPets.js
import React, { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/MyPets.css";

function MyPets() {
  const [myPets, setMyPets] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyPets = async () => {
      try {
        const res = await API.get("/adoptions/mine", { headers: { Authorization: `Bearer ${token}` } });
        setMyPets(res.data || []);
      } catch (err) {
        console.error("Failed to load my pets", err);
      }
    };
    fetchMyPets();
  }, []);

  return (
    <div className="mypets-container">
      <h2>My Adopted Pets</h2>
      {myPets.length === 0 ? <p>You have no approved adoptions yet.</p> : (
        <div className="pet-list">
          {myPets.map((pet) => (
            <div key={pet._id} className="pet-card">
              <h3>{pet.name}</h3>
              <p>{pet.breed} • {pet.species}</p>
              <p>Age: {pet.ageYears}y {pet.ageMonths}m</p>
              {pet.imageUrl && <img src={pet.imageUrl} alt={pet.name} style={{width: '150px'}} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPets;
