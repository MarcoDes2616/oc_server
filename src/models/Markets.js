const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Markets = sequelize.define(
  "market",
  {
    market_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Markets;
