const User = require("../models/User");

// @desc    Get all riders
// @route   GET /api/users/riders
// @access  Private (Admin)
const getRiders = async (req, res) => {
  try {
    const riders = await User.find({ role: "rider" }).select(
      "-password"
    );
    res.json(riders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all users (optional)
// @route   GET /api/users
// @access  Private (Admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getRiders,
  getAllUsers,
};