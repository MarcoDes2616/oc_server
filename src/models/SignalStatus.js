const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const SignalStatus = sequelize.define(
  "signal_status",
  {
    signal_status_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = SignalStatus;
