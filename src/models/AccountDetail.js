const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const AccountDetail = sequelize.define(
    "account_detail",
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        investment_amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        profit_loss: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        last_updated: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        objective: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    { 
        timestamps: false,
        tableName: "account_detail",
    }
);

module.exports = AccountDetail;

