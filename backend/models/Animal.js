// backend/models/Animal.js
import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  species: { type: String, required: true }, // e.g. Dog, Cat
  ageYears: { type: Number, default: 0 },
  ageMonths: { type: Number, default: 0 },
  status: { type: String, enum: ["available", "adopted"], default: "available" },
  currentOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  imageUrl: { type: String, default: "" }
}, { timestamps: true });

const Animal = mongoose.model("Animal", animalSchema);
export default Animal;
