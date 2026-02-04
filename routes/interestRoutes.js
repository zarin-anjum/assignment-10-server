import express from "express";
import Interest from "../models/Interest.js";

const router = express.Router();

//Send interest
router.post("/add", async (req, res) => {
  console.log("REQUEST BODY:", req.body); 

  try {
    const { cropId, requester } = req.body;

    const existingInterest = await Interest.findOne({
      cropId,
      "requester.email": requester.email,
    });

    if (existingInterest) {
      return res.status(400).json({
        message: "You have already sent an interest for this crop",
      });
    }

    const interest = new Interest(req.body);
    await interest.save();

    res.status(201).json({
      message: "Interest sent successfully",
      interest,
    });
  } catch (error) {
    console.error("INTEREST ERROR:", error); 

    res.status(500).json({
      message: "Failed to send interest",
      error: error.message, 
    });
  }
});

//Get interests by logged-in user
router.get("/my-interests/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const interests = await Interest.find({
      "requester.email": email,
    });

    res.json(interests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch interests" });
  }
});

// Get interests for a specific crop (owner view)
router.get("/crop/:cropId", async (req, res) => {
  try {
    const { cropId } = req.params;

    const interests = await Interest.find({ cropId });

    res.status(200).json(interests);
  } catch (error) {
    console.error("FETCH CROP INTERESTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch crop interests" });
  }
});

//Update interest status (for crop owner later)
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Interest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
});

export default router;
