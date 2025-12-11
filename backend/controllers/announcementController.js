const Announcement = require("../models/Announcement");
const asyncHandler = require("../utils/asyncHandler");

// GET all announcements (public)
exports.getAnnouncements = asyncHandler(async (req, res) => {
  const announcements = await Announcement.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json({ success: true, data: announcements });
});

// CREATE announcement (admin only)
exports.createAnnouncement = asyncHandler(async (req, res) => {
  const { title, message, category } = req.body;

  if (!title || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Title and message are required" });
  }

  const announcement = await Announcement.create({
    title,
    message,
    category,
    postedBy: req.user.email, // admin user
  });

  res.status(201).json({ success: true, data: announcement });
});

// DELETE announcement (admin only)
exports.deleteAnnouncement = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const exists = await Announcement.findByPk(id);
  if (!exists) {
    return res
      .status(404)
      .json({ success: false, message: "Announcement not found" });
  }

  await exists.destroy();

  res.json({ success: true, message: "Announcement deleted successfully" });
});
