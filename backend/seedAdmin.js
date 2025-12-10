const bcrypt = require("bcryptjs");
const User = require("./models/User");
const { sequelize } = require("./config/db");

(async () => {
  await sequelize.sync();

  const hashed = await bcrypt.hash("admin123", 10);

  await User.create({
    email: "admin@ngo.org",
    password: hashed,
    role: "admin"
  });

  console.log("Admin user created: admin@ngo.org / admin123");
  process.exit();
})();
