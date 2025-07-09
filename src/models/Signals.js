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
      type: DataTypes.STRING,
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
      allowNull: false,
    },
    price_range_max: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    expected_target: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    entry_point: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    max_drop_down: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    init_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    signal_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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