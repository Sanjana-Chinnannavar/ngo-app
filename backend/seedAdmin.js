const User = require("./models/User");
const { sequelize } = require("./config/db");

(async () => {
  await sequelize.sync();

  await User.create({
    email: "admin@ngo.org",
    password: "admin123",   // plain text — the model will hash it
    role: "admin"
  });

  console.log("Admin user created: admin@ngo.org / admin123");
  process.exit();
})();
