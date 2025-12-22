import express from "express";
import Crop from "../models/Crop.js";

const router = express.Router();

//Add Crops
router.post("/add", async (req, res) => {
  try {
    const cropData = req.body;

    const newCrop = new Crop(cropData);
    await newCrop.save();

    res.status(201).json({ message: "Crop added successfully", crop: newCrop });
  } catch (error) {
    res.status(500).json({ error: "Failed to add crop" });
  }
});

//My Posts
router.get("/my-crops/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const crops = await Crop.find({
      "owner.ownerEmail": email,
    });

    res.json(crops);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch crops" });
  }
});

// Delete crop by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Crop.findByIdAndDelete(id);
    res.json({ message: "Crop deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete crop" });
  }
});

// UPDATE crop
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCrop = await Crop.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedCrop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    res.json({ message: "Crop updated successfully", crop: updatedCrop });
  } catch (error) {
    res.status(500).json({ message: "Failed to update crop" });
  }
});

export default router;