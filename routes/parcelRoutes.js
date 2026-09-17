const express = require("express");
const router = express.Router();
const {
  createParcel,
  getMyParcels,
  getAllParcels,
  updateParcelStatus,
  getParcelById,
  assignRider,
  getAssignedParcels,
} = require("../controllers/parcelController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// User
router.post("/", protect, authorizeRoles("user"), createParcel);
router.get("/my-parcels", protect, authorizeRoles("user"), getMyParcels);

// Rider
router.get("/assigned", protect, authorizeRoles("rider"), getAssignedParcels);

// Admin
router.get("/", protect, authorizeRoles("admin"), getAllParcels);
router.patch("/:id/assign", protect, authorizeRoles("admin"), assignRider);

// Common (Admin + Rider)
router.get("/:id", protect, getParcelById);
router.patch(
  "/:id/status",
  protect,
  authorizeRoles("admin", "rider"),
  updateParcelStatus
);

module.exports = router;