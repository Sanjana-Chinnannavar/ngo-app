const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const EventAssignment = sequelize.define(
  "EventAssignment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    volunteerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("PENDING", "ACCEPTED", "REJECTED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
  },
  {
    tableName: "event_assignments",
    timestamps: true,
  }
);
EventAssignment.associate = (models) => {
  EventAssignment.belongsTo(models.Event, { foreignKey: "eventId" });
  EventAssignment.belongsTo(models.Volunteer, { foreignKey: "volunteerId" });
};

module.exports = EventAssignment;
