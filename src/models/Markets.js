const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Markets = sequelize.define(
  "market",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
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
