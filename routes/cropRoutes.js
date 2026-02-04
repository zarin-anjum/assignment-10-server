import express from "express";
import Crop from "../models/Crop.js";

const router = express.Router();

//Add Crops
router.post("/add", async (req, res) => {
  try {
    const newCrop = new Crop(req.body);
    await newCrop.save();

    res.status(201).json({
      message: "Crop added successfully",
      crop: newCrop,
    });
  } catch (error) {
    console.error("ADD CROP ERROR:", error);
    res.status(500).json({ message: "Failed to add crop" });
  }
});

// Get All Crops(All Crops Page)
router.get("/", async (req, res) => {
  try {
    const crops = await Crop.find().sort({ createdAt: -1 });
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch crops" });
  }
});

//Get Single Crop(Details Page)
router.get("/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }
    res.json(crop);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch crop" });
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
    await Crop.findByIdAndDelete(req.params.id);
    res.json({ message: "Crop deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete crop" });
  }
});

// UPDATE crop
router.put("/:id", async (req, res) => {
  try {
    const updatedCrop = await Crop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedCrop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    res.json({
      message: "Crop updated successfully",
      crop: updatedCrop,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update crop" });
  }
});

export default router;
