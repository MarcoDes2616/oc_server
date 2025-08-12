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
      defaultValue: false,
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
      defaultValue: true,
    },
    telegram_user: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    pushToken: {
      type: DataTypes.STRING,
      allowNull: true, // Puede ser null si el usuario no permite notificaciones
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

Users.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.last_login;
  delete values.login_token;
  delete values.token_expires;  
  return values;
};

module.exports = Users;