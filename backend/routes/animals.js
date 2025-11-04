// backend/routes/animals.js
import express from "express";
import { getAnimals, addAnimal, deleteAnimal } from "../controllers/animalController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAnimals);                 // public
router.post("/", protect, adminOnly, addAnimal); // admin only
router.delete("/:id", protect, adminOnly, deleteAnimal); // admin only

export default router;
