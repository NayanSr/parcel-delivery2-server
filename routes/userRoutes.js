const express = require("express");
const router = express.Router();
const { getRiders, getAllUsers } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/riders", protect, authorizeRoles("admin"), getRiders);
router.get("/", protect, authorizeRoles("admin"), getAllUsers);

module.exports = router;