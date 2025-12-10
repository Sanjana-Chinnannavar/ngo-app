const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Volunteer = sequelize.define("Volunteer", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [2, 50] }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [10, 15] }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  skills: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  availability: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "volunteers",
  timestamps: true
});

module.exports = Volunteer;
