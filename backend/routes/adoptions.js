// backend/routes/adoptions.js
import express from "express";
import {
  requestAdoption,
  getAllRequests,
  decideRequest,
  getMyApprovedPets
} from "../controllers/adoptionController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, requestAdoption);         // user creates a request
router.get("/", protect, adminOnly, getAllRequests); // admin sees all requests
router.put("/:id", protect, adminOnly, decideRequest); // admin approve/reject with { status: 'approved'|'rejected' }
router.get("/mine", protect, getMyApprovedPets);    // user sees approved pets

export default router;
