import express from "express";
import Interest from "../models/Interest.js";

const router = express.Router();

//Send interest
router.post("/add", async (req, res) => {
  console.log("REQUEST BODY:", req.body); // 👈 MUST HAVE

  try {
    const interest = new Interest(req.body);
    await interest.save();

    res.status(201).json({
      message: "Interest sent successfully",
      interest,
    });
  } catch (error) {
    console.error("INTEREST ERROR:", error); // 👈 MUST HAVE

    res.status(500).json({
      message: "Failed to send interest",
      error: error.message, // 👈 SHOW REAL ERROR
    });
  }
});

//Get interests by logged-in user
router.get("/my-interests/:email", async (req, res) => {
  try {
    const interests = await Interest.find({
      interestedUserEmail: req.params.email,
    });
    res.json(interests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch interests" });
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
