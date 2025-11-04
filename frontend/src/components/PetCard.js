import React from "react";

function PetCard({ pet, onAdopt }) {
  return (
    <div className="pet-card">
      <h3>{pet.name}</h3>
      <p>Breed: {pet.breed}</p>
      <p>Animal: {pet.animal}</p>
      <p>Age: {pet.age}</p>

      {onAdopt && (
        <button onClick={() => onAdopt(pet._id)}>Adopt</button>
      )}
    </div>
  );
}

export default PetCard;
