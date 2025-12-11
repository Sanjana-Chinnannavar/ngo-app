const express = require("express");
const {
  getVolunteers,
  addVolunteer,
  updateVolunteer,
  deleteVolunteer
} = require("../controllers/volunteerController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Public (or login required? You decide)
router.get("/", getVolunteers);

// Admin only — CRUD
router.post("/", auth, admin, addVolunteer);
router.put("/:id", auth, admin, updateVolunteer);
router.delete("/:id", auth, admin, deleteVolunteer);

module.exports = router;
