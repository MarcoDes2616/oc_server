const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const OperationTypes = sequelize.define(
  "operation_type",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    operation_type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = OperationTypes;
