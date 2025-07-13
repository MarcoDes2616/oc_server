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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sign_declare: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    login_token: {
      type: DataTypes.STRING(12),
      allowNull: true,
    },
    token_expires: {
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
     last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

module.exports = Users;