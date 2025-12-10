const Event = require("../models/Event");
const asyncHandler = require("../utils/asyncHandler");
const { Op } = require("sequelize");

// FORMAT EVENT FOR CALENDAR UI
const formatEvent = (event) => {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    startTime: event.startTime,
    endTime: event.endTime,
    location: event.location,
    coordinator: event.coordinator,
    status: event.status,

    // Calendar-friendly fields
    start: `${event.date}T${event.startTime}`,
    end: event.endTime ? `${event.date}T${event.endTime}` : null
  };
};

// GET ALL EVENTS
exports.getEvents = asyncHandler(async (req, res) => {
  const events = await Event.findAll({
    order: [["date", "ASC"]]
  });

  res.json({
    success: true,
    data: events.map(formatEvent)
  });
});

// GET EVENTS BY DATE
exports.getEventsByDate = asyncHandler(async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({
      success: false,
      message: "Date query param required (YYYY-MM-DD)"
    });
  }

  const events = await Event.findAll({
    where: { date }
  });

  res.json({
    success: true,
    data: events.map(formatEvent)
  });
});

// CREATE EVENT
exports.addEvent = asyncHandler(async (req, res) => {
  const { title, date, startTime, location, coordinator } = req.body;

  if (!title || !date || !startTime || !location || !coordinator) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields."
    });
  }

  const event = await Event.create(req.body);

  res.status(201).json({
    success: true,
    data: formatEvent(event)
  });
});

// UPDATE EVENT
exports.updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const event = await Event.findByPk(id);
  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found"
    });
  }

  await event.update(req.body);

  res.json({
    success: true,
    data: formatEvent(event)
  });
});

// DELETE EVENT
exports.deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const event = await Event.findByPk(id);
  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found"
    });
  }

  await event.destroy();

  res.json({
    success: true,
    message: "Event deleted successfully"
  });
});
