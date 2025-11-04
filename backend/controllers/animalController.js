// backend/controllers/animalController.js
import Animal from "../models/Animal.js";

export const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    return res.status(200).json(animals);
  } catch (err) {
    console.error("getAnimals error:", err);
    return res.status(500).json({ message: "Failed to fetch animals" });
  }
};

export const addAnimal = async (req, res) => {
  try {
    // admin-only enforced in route middleware
    const { name, breed, species, ageYears = 0, ageMonths = 0, imageUrl = "" } = req.body;

    if (!name || !breed || !species) {
      return res.status(400).json({ message: "name, breed and species are required" });
    }

    const animal = new Animal({
      name,
      breed,
      species,
      ageYears,
      ageMonths,
      imageUrl,
      status: "available"
    });

    await animal.save();
    return res.status(201).json({ message: "Animal added", animal });
  } catch (err) {
    console.error("addAnimal error:", err);
    return res.status(500).json({ message: "Failed to add animal" });
  }
};

export const deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findById(id);
    if (!animal) return res.status(404).json({ message: "Animal not found" });
    if (animal.status === "adopted") {
      return res.status(400).json({ message: "Cannot delete adopted animal" });
    }
    await animal.deleteOne();
    return res.json({ message: "Animal deleted" });
  } catch (err) {
    console.error("deleteAnimal error:", err);
    return res.status(500).json({ message: "Failed to delete animal" });
  }
};
