const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Project = sequelize.define(
  "project",
  {
    project_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    init_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
    tableName: "project",
  }
);

module.exports = Project;
