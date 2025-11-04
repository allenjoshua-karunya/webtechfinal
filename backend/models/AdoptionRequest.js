// backend/models/AdoptionRequest.js
import mongoose from "mongoose";

const adoptionRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  animalId: { type: mongoose.Schema.Types.ObjectId, ref: "Animal", required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  requestedAt: { type: Date, default: Date.now },
  decidedAt: { type: Date },
  decidedByAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const AdoptionRequest = mongoose.model("AdoptionRequest", adoptionRequestSchema);
export default AdoptionRequest;
