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
    timestamps: true,
    tableName: "signals",
  }
);


Signals.afterFind(async(signal) => {
  if (signal.dataValues) {
      const url = await getFirebaseUrl(signal.image_reference)
      signal.image_reference = url
      return
  }

  const urls = signal.map(async(item) => {
      if(item.image_reference){
          const url = await getFirebaseUrl(item.image_reference)
          item.image_reference = url
      }
  })
  await Promise.all(urls)
  return signal
})

module.exports = Signals;