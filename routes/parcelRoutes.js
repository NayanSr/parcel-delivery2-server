const express = require("express");
const router = express.Router();
const {
  createParcel,
  getMyParcels,
  getAllParcels,
  updateParcelStatus,
  getParcelById,
} = require("../controllers/parcelController");


const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// User routes
router.post("/", protect, authorizeRoles("user"), createParcel);
router.get("/my-parcels", protect, authorizeRoles("user"), getMyParcels);

// Admin routes
router.get("/", protect, authorizeRoles("admin"), getAllParcels);

// Common
router.get("/:id", protect, getParcelById);
router.patch(
  "/:id/status",
  protect,
  authorizeRoles("admin", "rider"),
  updateParcelStatus
);

module.exports = router;