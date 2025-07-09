const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const OperationalBook = sequelize.define(
  "operational_book",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    signal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    operation_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    instrument_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    entry_point: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    exit_point: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    lote: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    profit: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    is_successful: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "operational_book",
  }
);

module.exports = OperationalBook;
