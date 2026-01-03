const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Volunteer = sequelize.define(
  "Volunteer",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isEmail: true },
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    skills: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },

    availability: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
  },
  {
    tableName: "volunteers",
    timestamps: true,
  }
);
Volunteer.associate = (models) => {
  Volunteer.belongsToMany(models.Event, {
    through: models.EventAssignment,
    foreignKey: "volunteerId",
    otherKey: "eventId",
  });
};

module.exports = Volunteer;
