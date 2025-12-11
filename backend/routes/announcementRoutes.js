const express = require("express");
const {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Public routes
router.get("/", getAnnouncements);

// Admin only
router.post("/", auth, admin, createAnnouncement);
router.delete("/:id", auth, admin, deleteAnnouncement);

module.exports = router;
