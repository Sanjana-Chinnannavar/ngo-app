const Event = require("../models/Event");
const asyncHandler = require("../utils/asyncHandler");

// Format event for UI + Calendar
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
    volunteersNeeded: event.volunteersNeeded,

    // Calendar uses ISO timestamps
    start: `${event.date}T${event.startTime}`,
    end: event.endTime ? `${event.date}T${event.endTime}` : null,
  };
};

// GET ALL EVENTS
exports.getEvents = asyncHandler(async (req, res) => {
  const events = await Event.findAll({ order: [["date", "ASC"]] });

  res.json({
    success: true,
    data: events.map(formatEvent),
  });
});

// GET EVENTS BY DATE
exports.getEventsByDate = asyncHandler(async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({
      success: false,
      message: "Date query param required (YYYY-MM-DD)",
    });
  }

  const events = await Event.findAll({ where: { date } });

  res.json({
    success: true,
    data: events.map(formatEvent),
  });
});

// ADD EVENT
exports.addEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    date,
    startTime,
    endTime,
    location,
    coordinator,
    status,
    volunteersNeeded,
  } = req.body;

  if (!title || !date || !startTime || !location || !coordinator) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  const event = await Event.create({
    title,
    description,
    date,
    startTime,
    endTime,
    location,
    coordinator,
    status: status || "upcoming",
    volunteersNeeded: volunteersNeeded || 0,
  });

  res.status(201).json({
    success: true,
    data: formatEvent(event),
  });
});

// UPDATE EVENT
exports.updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const event = await Event.findByPk(id);
  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  await event.update(req.body);

  res.json({
    success: true,
    data: formatEvent(event),
  });
});

// DELETE EVENT
exports.deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const event = await Event.findByPk(id);
  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  await event.destroy();

  res.json({
    success: true,
    message: "Event deleted successfully",
  });
});


const EventAssignment = require("../models/EventAssignment");
const Volunteer = require("../models/Volunteer");

// ASSIGN EVENT TO VOLUNTEER (ADMIN)
exports.assignEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  const { volunteerId } = req.body;

  if (!volunteerId) {
    return res.status(400).json({
      success: false,
      message: "volunteerId is required",
    });
  }

  const event = await Event.findByPk(eventId);
  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  const volunteer = await Volunteer.findByPk(volunteerId);
  if (!volunteer) {
    return res.status(404).json({
      success: false,
      message: "Volunteer not found",
    });
  }

  const existing = await EventAssignment.findOne({
    where: { eventId, volunteerId },
  });

  if (existing) {
    if (existing.status === "REJECTED") {
      return res.status(400).json({
        success: false,
        message: `Volunteer previously rejected this event. Reason: ${existing.rejectionReason || "No reason provided"}`,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Volunteer already assigned to this event",
    });
  }

  const assignment = await EventAssignment.create({
    eventId,
    volunteerId,
    status: "PENDING",
  });

  res.status(201).json({
    success: true,
    data: assignment,
  });
});

// GET EVENT ASSIGNMENTS (ADMIN)
exports.getEventAssignments = asyncHandler(async (req, res) => {
  const eventId = req.params.id;

  const assignments = await EventAssignment.findAll({
    where: { eventId },
    include: [{
      model: Volunteer,
      attributes: ["id", "name", "email", "phone"]
    }]
  });

  res.json({
    success: true,
    data: assignments
  });
});

// GET ASSIGNED EVENTS (VOLUNTEER)
// GET ASSIGNED EVENTS (VOLUNTEER)
// GET ASSIGNED EVENTS (VOLUNTEER)
exports.getAssignedEvents = asyncHandler(async (req, res) => {
  // req.user comes from auth middleware
  const userId = req.user.id;

  // 1. find volunteer linked to this user
  const volunteer = await Volunteer.findOne({
    where: { userId },
  });

  if (!volunteer) {
    return res.json({ success: true, data: [] });
  }

  // 2. find assignments
  const assignments = await EventAssignment.findAll({
    where: { volunteerId: volunteer.id },
  });

  if (assignments.length === 0) {
    return res.json({ success: true, data: [] });
  }

  // 3. extract eventIds
  const eventIds = assignments.map(a => a.eventId);

  // 4. fetch events
  const events = await Event.findAll({
    where: { id: eventIds },
  });

  // 5. attach assignment info
  const enriched = events.map(event => {
    const assignment = assignments.find(a => a.eventId === event.id);
    return {
      ...event.toJSON(),
      assignmentId: assignment.id,
      status: assignment.status,
    };
  });

  res.json({ success: true, data: enriched });
});


// ACCEPT EVENT (VOLUNTEER)
exports.acceptEvent = asyncHandler(async (req, res) => {
  const assignment = await EventAssignment.findByPk(req.params.id);

  if (!assignment) {
    return res.status(404).json({ success: false });
  }

  assignment.status = "ACCEPTED";
  await assignment.save();

  res.json({ success: true });
});
// REJECT EVENT (VOLUNTEER)
exports.rejectEvent = asyncHandler(async (req, res) => {
  const assignment = await EventAssignment.findByPk(req.params.id);
  const { reason } = req.body;

  if (!assignment) {
    return res.status(404).json({ success: false });
  }

  if (!reason) {
    return res.status(400).json({
      success: false,
      message: "Rejection reason is required"
    });
  }

  assignment.status = "REJECTED";
  assignment.rejectionReason = reason;
  await assignment.save();

  res.json({ success: true });
});

