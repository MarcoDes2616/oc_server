const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const OperationTypes = sequelize.define(
  "operation_type",
  {
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
