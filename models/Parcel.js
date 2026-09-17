const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      unique: true,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Sender Info (snapshot)
    senderName: { type: String, required: true },
    senderPhone: { type: String, required: true },
    senderAddress: { type: String, required: true },

    // Receiver Info
    receiverName: { type: String, required: true },
    receiverPhone: { type: String, required: true },
    receiverAddress: { type: String, required: true },

    // Parcel Details
    parcelType: {
      type: String,
      enum: ["Document", "Box", "Fragile", "Other"],
      default: "Box",
    },
    weight: {
      type: Number,
      required: true,
      min: 0.1,
    },
    cost: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "assigned", "picked", "in-transit", "delivered", "cancelled"],
      default: "pending",
    },
    assignedRider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Parcel", parcelSchema);