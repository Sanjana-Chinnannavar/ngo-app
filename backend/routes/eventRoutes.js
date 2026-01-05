const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getEvents,
  getEventsByDate,
  addEvent,
  updateEvent,
  deleteEvent,
  acceptEvent,
  rejectEvent,
  assignEvent,
  getAssignedEvents,
  getEventAssignments,
} = require("../controllers/eventController");

// Public
router.get("/", getEvents);
router.get("/by-date", getEventsByDate);

// Admin-only
router.post("/", auth, admin, addEvent);
router.put("/:id", auth, admin, updateEvent);
router.delete("/:id", auth, admin, deleteEvent);
router.post("/:id/assign", auth, admin, assignEvent);
router.get("/:id/assignments", auth, admin, getEventAssignments);


// Volunteer assigned events
router.get("/assigned", auth, getAssignedEvents);

// Authenticated users
router.post("/:id/accept", auth, acceptEvent);
router.post("/:id/reject", auth, rejectEvent);

module.exports = router;
