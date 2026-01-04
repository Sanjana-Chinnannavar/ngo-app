const Volunteer = require("../models/Volunteer");
const User = require("../models/User");
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

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and email are required.",
    });
  }

  // check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User with this email already exists.",
    });
  }

  // ✅ create user (PLAIN TEXT PASSWORD)
  const user = await User.create({
    email,
    password: "vol123",
    role: "volunteer",
  });

  // create volunteer profile
  const volunteer = await Volunteer.create({
    name,
    email,
    phone,
    skills,
    availability,
    userId: user.id,
  });

  res.status(201).json({ success: true, data: volunteer });
});

// UPDATE volunteer
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

  // 🔁 sync email if changed
  if (req.body.email && req.body.email !== exists.email) {
    await User.update(
      { email: req.body.email },
      { where: { id: exists.userId } }
    );
  }

  await exists.update(req.body);

  res.json({ success: true, data: exists });
});


/// DELETE volunteer
exports.deleteVolunteer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const volunteer = await Volunteer.findByPk(id);
  if (!volunteer) {
    return res.status(404).json({
      success: false,
      message: "Volunteer not found",
    });
  }

  // delete volunteer first
  await Volunteer.destroy({ where: { id } });

  // delete linked user
  await User.destroy({ where: { id: volunteer.userId } });

  res.json({ success: true, message: "Volunteer removed." });
});


// GET MY PROFILE (VOLUNTEER)
exports.getMyProfile = asyncHandler(async (req, res) => {
  const volunteer = await Volunteer.findOne({
    where: { userId: req.user.id },
  });

  if (!volunteer) {
    return res.status(404).json({ success: false });
  }

  res.json({ success: true, data: volunteer });
});

// GET MY PROFILE (LOGGED-IN VOLUNTEER)
exports.getMyProfile = asyncHandler(async (req, res) => {
  const volunteer = await Volunteer.findOne({
    where: { userId: req.user.id },
  });

  if (!volunteer) {
    return res.status(404).json({
      success: false,
      message: "Profile not found",
    });
  }

  res.json({
    success: true,
    data: volunteer,
  });
});
// UPDATE MY PROFILE (LOGGED-IN VOLUNTEER)
// UPDATE MY PROFILE (LOGGED-IN VOLUNTEER)
// UPDATE MY PROFILE (LOGGED-IN VOLUNTEER)
// UPDATE MY PROFILE (LOGGED-IN VOLUNTEER)
exports.updateMyProfile = asyncHandler(async (req, res) => {
  const volunteer = await Volunteer.findOne({
    where: { userId: req.user.id },
  });

  if (!volunteer) {
    return res.status(404).json({
      success: false,
      message: "Profile not found",
    });
  }

  // ✅ ONLY allow specific fields
  const updates = {};
  const allowedFields = ["name", "phone", "skills", "availability"];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  await volunteer.update(updates);

  res.json({
    success: true,
    data: volunteer,
  });
});



