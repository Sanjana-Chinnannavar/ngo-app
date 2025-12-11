const User = require("./models/User");
const { sequelize } = require("./config/db");
const bcrypt = require("bcryptjs");

(async () => {
  await sequelize.sync();

  const user = await User.findOne({ where: { email: "admin@ngo.org" } });
  if (!user) {
    console.log("Admin not found");
    process.exit();
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash("admin123", salt);

  user.password = hashed;
  await user.save();

  console.log("Admin password reset to admin123");
  process.exit();
})();
