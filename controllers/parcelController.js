const Parcel = require("../models/Parcel");

// Tracking ID জেনারেটর
const generateTrackingId = () => {
  const prefix = "PD";
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${random}`;
};

// @desc    Create new parcel
// @route   POST /api/parcels
// @access  Private (User)
const createParcel = async (req, res) => {
  try {
    const {
      senderName,
      senderPhone,
      senderAddress,
      receiverName,
      receiverPhone,
      receiverAddress,
      parcelType,
      weight,
      notes,
    } = req.body;

    if (
      !senderName ||
      !senderPhone ||
      !senderAddress ||
      !receiverName ||
      !receiverPhone ||
      !receiverAddress ||
      !weight
    ) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Simple cost calculation (প্রতি কেজি ৫০ টাকা + বেস ৮০ টাকা)
    const cost = Math.ceil(80 + weight * 50);

    const parcel = await Parcel.create({
      trackingId: generateTrackingId(),
      sender: req.user._id,
      senderName,
      senderPhone,
      senderAddress,
      receiverName,
      receiverPhone,
      receiverAddress,
      parcelType: parcelType || "Box",
      weight,
      cost,
      notes: notes || "",
    });

    res.status(201).json(parcel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get my parcels (User)
// @route   GET /api/parcels/my-parcels
// @access  Private (User)
const getMyParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find({ sender: req.user._id })
      .sort({ createdAt: -1 })
      .populate("assignedRider", "name phone");

    res.json(parcels);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all parcels (Admin)
// @route   GET /api/parcels
// @access  Private (Admin)
const getAllParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find()
      .sort({ createdAt: -1 })
      .populate("sender", "name email phone")
      .populate("assignedRider", "name phone");

    res.json(parcels);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update parcel status
// @route   PATCH /api/parcels/:id/status
// @access  Private (Admin / Rider)
const updateParcelStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatus = [
      "pending",
      "assigned",
      "picked",
      "in-transit",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const parcel = await Parcel.findById(req.params.id);

    if (!parcel) {
      return res.status(404).json({ message: "Parcel not found" });
    }

    parcel.status = status;
    await parcel.save();

    res.json(parcel);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get single parcel
// @route   GET /api/parcels/:id
// @access  Private
const getParcelById = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id)
      .populate("sender", "name email phone")
      .populate("assignedRider", "name phone");

    if (!parcel) {
      return res.status(404).json({ message: "Parcel not found" });
    }

    res.json(parcel);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createParcel,
  getMyParcels,
  getAllParcels,
  updateParcelStatus,
  getParcelById,
};