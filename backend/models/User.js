const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM("admin", "volunteer"),
    allowNull: false,
    defaultValue: "volunteer"
  }
}, {
  tableName: "users",
  timestamps: true
});

// 🔥 PLAIN PASSWORD CHECK — NO HASHING
User.prototype.validatePassword = function(password) {
  return password === this.password;
};

module.exports = User;
