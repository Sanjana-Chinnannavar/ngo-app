const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Event = sequelize.define("Event", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  startTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  endTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  coordinator: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("upcoming", "completed", "cancelled"),
    defaultValue: "upcoming",
  }
}, {
  tableName: "events",
  timestamps: true,
});

module.exports = Event;
