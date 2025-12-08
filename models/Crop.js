import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  pricePerUnit: { type: Number, required: true },
  unit: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },

  owner: {
    ownerName: String,
    ownerEmail: String,
    ownerPhoto: String
  }
}, { timestamps: true });

const Crop = mongoose.model("Crop", cropSchema);
export default Crop;
