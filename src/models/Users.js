const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Users = sequelize.define(
  "users",
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sign_declare: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reset_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password_change_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    telegram_user: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

module.exports = Users;