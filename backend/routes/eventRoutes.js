const express = require("express");
const {
  getEvents,
  getEventsByDate,
  addEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");

const router = express.Router();

router.get("/", getEvents);
router.get("/by-date", getEventsByDate);
router.post("/", addEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
