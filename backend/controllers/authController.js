const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found." });
  }

  const isValid = user.password == password;
  if (!isValid) {
    return res.status(400).json({ success: false, message: "Invalid password." });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    "secret123",
    { expiresIn: "1d" }
  );

  res.json({
    success: true,
    token,
    user: { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    }
  });
});
