const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "ngo.sqlite",
});

module.exports = { sequelize };
