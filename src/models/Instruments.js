const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Instruments = sequelize.define(
  "instruments",
  {
    instrument_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Instruments;