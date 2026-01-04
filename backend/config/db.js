const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "ngo.sqlite"),
});

sequelize.authenticate().then(() => {
  sequelize.query("PRAGMA foreign_keys = ON;");
  console.log("SQLite FK enforcement ON");
});

module.exports = { sequelize };
