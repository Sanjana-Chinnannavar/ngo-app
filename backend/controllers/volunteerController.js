const Volunteer = require("../models/Volunteer");
const asyncHandler = require("../utils/asyncHandler");

exports.getVolunteers = asyncHandler(async (req, res) => {
  const volunteers = await Volunteer.findAll({ order: [["createdAt", "DESC"]] });
  res.json({ success: true, data: volunteers });
});

exports.addVolunteer = asyncHandler(async (req, res) => {
  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({ success: false, message: "All fields required." });
  }

  const exists = await Volunteer.findOne({ where: { email } });
  if (exists) {
    return res.status(409).json({ success: false, message: "Volunteer already exists." });
  }

  const volunteer = await Volunteer.create(req.body);
  res.status(201).json({ success: true, data: volunteer });
});

exports.updateVolunteer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const exists = await Volunteer.findByPk(id);
  if (!exists) {
    return res.status(404).json({ success: false, message: "Volunteer not found." });
  }

  await Volunteer.update(req.body, { where: { id } });

  const updated = await Volunteer.findByPk(id);
  res.json({ success: true, data: updated });
});

exports.deleteVolunteer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const exists = await Volunteer.findByPk(id);
  if (!exists) {
    return res.status(404).json({ success: false, message: "Volunteer not found." });
  }

  await Volunteer.destroy({ where: { id } });

  res.json({ success: true, message: "Volunteer deleted successfully." });
});
