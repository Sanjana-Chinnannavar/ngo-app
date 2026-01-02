const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = sequelize.define("EventParticipation", {
  status: {
    type: DataTypes.ENUM("accepted", "rejected"),
    allowNull: false,
  },
});
