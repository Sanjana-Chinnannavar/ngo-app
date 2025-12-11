const express = require("express");
const {
  getEvents,
  getEventsByDate,
  addEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Public
router.get("/", getEvents);
router.get("/by-date", getEventsByDate);

// Admin-only
router.post("/", auth, admin, addEvent);
router.put("/:id", auth, admin, updateEvent);
router.delete("/:id", auth, admin, deleteEvent);

module.exports = router;
