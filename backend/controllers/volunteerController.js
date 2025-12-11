const Volunteer = require("../models/Volunteer");
const asyncHandler = require("../utils/asyncHandler");

// GET all volunteers
exports.getVolunteers = asyncHandler(async (req, res) => {
  const volunteers = await Volunteer.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json({ success: true, data: volunteers });
});

// ADD volunteer
exports.addVolunteer = asyncHandler(async (req, res) => {
  const { name, email, phone, skills, availability } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Name is required.",
    });
  }

  const volunteer = await Volunteer.create({
    name,
    email,
    phone,
    skills,
    availability,
  });

  res.status(201).json({ success: true, data: volunteer });
});

// UPDATE volunteer
exports.updateVolunteer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const exists = await Volunteer.findByPk(id);
  if (!exists) {
    return res.status(404).json({
      success: false,
      message: "Volunteer not found",
    });
  }

  await exists.update(req.body);

  res.json({ success: true, data: exists });
});

// DELETE volunteer
exports.deleteVolunteer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const exists = await Volunteer.findByPk(id);
  if (!exists) {
    return res.status(404).json({
      success: false,
      message: "Volunteer not found",
    });
  }

  await exists.destroy();

  res.json({ success: true, message: "Volunteer removed." });
});
