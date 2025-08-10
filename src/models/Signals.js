const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Signals = sequelize.define(
  "signals",
  {
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    instrument_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    operation_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_reference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price_range_min: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    price_range_max: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    expected_target: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    entry_point: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    sl_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    signal_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5, // Default to "Pending"
    },
    is_successful: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "signals",
  }
);

module.exports = Signals;