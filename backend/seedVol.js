const User = require("./models/User");
const { sequelize } = require("./config/db");

(async () => {
  await sequelize.sync();

  await User.create({
    email: "volunteer@ngo.org",
    password: "vol123",
    role: "volunteer"
  });

  console.log("Volunteer user created: volunteer@ngo.org / vol123");
  process.exit();
})();
