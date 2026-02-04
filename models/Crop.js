import mongoose from "mongoose";

const cropSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    pricePerUnit: { type: Number, required: true },
    unit: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },

    status: {
      type: String,
      enum: ["available", "sold", "hidden"],
      default: "available",
    },

    owner: {
      ownerName: { type: String, required: true },
      ownerEmail: { type: String, required: true },
      ownerPhoto: { type: String },
    },
  },
  { timestamps: true },
);

export default mongoose.model("Crop", cropSchema);
