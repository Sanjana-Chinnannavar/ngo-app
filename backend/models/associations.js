const Event = require("./Event");
const Volunteer = require("./Volunteer");
const EventAssignment = require("./EventAssignment");

Event.belongsToMany(Volunteer, {
  through: EventAssignment,
  foreignKey: "eventId",
});

Volunteer.belongsToMany(Event, {
  through: EventAssignment,
  foreignKey: "volunteerId",
});

module.exports = { Event, Volunteer, EventAssignment };
