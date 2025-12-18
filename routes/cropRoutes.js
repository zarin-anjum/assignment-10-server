import express from "express";
import Crop from "../models/Crop.js";

const router = express.Router();

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

export default router;