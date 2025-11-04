// backend/controllers/adoptionController.js
import AdoptionRequest from "../models/AdoptionRequest.js";
import Animal from "../models/Animal.js";
import User from "../models/User.js";

export const requestAdoption = async (req, res) => {
  try {
    const userId = req.user._id;
    const { animalId } = req.body;
    if (!animalId) return res.status(400).json({ message: "animalId required" });

    const animal = await Animal.findById(animalId);
    if (!animal) return res.status(404).json({ message: "Animal not found" });
    if (animal.status !== "available") return res.status(400).json({ message: "Animal not available" });

    const existing = await AdoptionRequest.findOne({ userId, animalId, status: "pending" });
    if (existing) return res.status(400).json({ message: "You already have a pending request for this animal" });

    const reqDoc = await AdoptionRequest.create({ userId, animalId });
    return res.status(201).json({ message: "Adoption request created", request: reqDoc });
  } catch (err) {
    console.error("requestAdoption error:", err);
    return res.status(500).json({ message: "Failed to create adoption request" });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const requests = await AdoptionRequest.find()
      .populate("userId", "username")
      .populate("animalId", "name species breed status");
    return res.json(requests);
  } catch (err) {
    console.error("getAllRequests error:", err);
    return res.status(500).json({ message: "Failed to fetch requests" });
  }
};

export const decideRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await AdoptionRequest.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.status !== "pending") return res.status(400).json({ message: "Request already decided" });

    request.status = status;
    request.decidedAt = new Date();
    request.decidedByAdmin = req.user._id;
    await request.save();

    if (status === "approved") {
      const animal = await Animal.findById(request.animalId);
      if (animal) {
        animal.status = "adopted";
        animal.currentOwner = request.userId;
        await animal.save();

        // Optionally, could push animal ID into User.adoptedPets if you have that field
        const user = await User.findById(request.userId);
        if (user) {
          // nothing required if not storing list; keep minimal
        }
      }
    }

    return res.json({ message: `Request ${status}` });
  } catch (err) {
    console.error("decideRequest error:", err);
    return res.status(500).json({ message: "Failed to update request" });
  }
};

export const getMyApprovedPets = async (req, res) => {
  try {
    const userId = req.user._id;
    const approvedRequests = await AdoptionRequest.find({ userId, status: "approved" }).populate("animalId");
    const pets = approvedRequests.map((r) => r.animalId);
    return res.json(pets);
  } catch (err) {
    console.error("getMyApprovedPets error:", err);
    return res.status(500).json({ message: "Failed to fetch your pets" });
  }
};
