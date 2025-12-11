const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Announcement = sequelize.define(
  "Announcement",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "general", // optional field
    },
    postedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "announcements",
    timestamps: true,
  }
);

module.exports = Announcement;
