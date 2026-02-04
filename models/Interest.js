import mongoose from "mongoose"

const interestSchema = new mongoose.Schema(
  {
    cropId: {
      type: String,
      required: true,
    },

    cropName: {
      type: String,
      required: true,
    },

    owner: {
      ownerName: {
        type: String,
        required: true,
      },
      ownerEmail: {
        type: String,
        required: true,
      },
    },

    requester: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },

    quantity: {
      type: Number,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Interest = mongoose.model("Interest", interestSchema);
export default Interest;
