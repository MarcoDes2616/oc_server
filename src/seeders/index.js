const sequelize = require("../utils/connection");
const Roles = require("../models/Roles");
const Instruments = require("../models/Instruments");
const Markets = require("../models/Markets");
const OperationTypes = require("../models/OperationType");
const SignalStatus = require("../models/SignalStatus");
// const Users = require("../models/Users");
const initModels = require('../models');

const role = [{ role_name: "Admin" }, { role_name: "usuario" }];

const instruments = [{instrument_name: "V10"}, {instrument_name: "V25"}, {instrument_name: "V75"}, {instrument_name: "V50"}, {instrument_name: "STEP"}, {instrument_name: "V100"}]

const markets = [
  { market_name: "Forex" },
  { market_name: "Indices" },
  { market_name: "Cryptocurrencies" },
  { market_name: "Commodities" },
];

const operationsTypes = [
  { operation_type_name: "Buy" },
  { operation_type_name: "Sell" },
  { operation_type_name: "Close" },
  { operation_type_name: "Pending" },
  { operation_type_name: "Stop Loss" },
  { operation_type_name: "Take Profit" },
  { operation_type_name: "Pending Buy" },
  { operation_type_name: "Pending Sell" },
  { operation_type_name: "Pending Close" },
  { operation_type_name: "Pending Stop Loss" },
  { operation_type_name: "Pending Take Profit" },
];

const signalStatus = [
  { signal_status_name: "Active" },
  { signal_status_name: "Inactive" },
  { signal_status_name: "Completed" },
  { signal_status_name: "Cancelled" },
  { signal_status_name: "Pending" },
  { signal_status_name: "Rejected" },
  { signal_status_name: "Approved" },
  { signal_status_name: "Expired" },
  { signal_status_name: "Failed" },
  { signal_status_name: "Processing" },
  { signal_status_name: "On Hold" },
  { signal_status_name: "Draft" },
  { signal_status_name: "Archived" },
  { signal_status_name: "Scheduled" },
  { signal_status_name: "Confirmed" },
  { signal_status_name: "Unconfirmed" },
]

// const users = [
//   {
//     name: "Marco",
//     lastname: "Cardenas",
//     email: "marco2616@gmail.com",
//     birthday: "1983-04-05",
//     documentNumber: "16261755",
//     signDeclare: true,
//     roleId: 1,
//   },
// ];


async function seedCreate() {
  await Roles.bulkCreate(role);
  await Instruments.bulkCreate(instruments);
  await Markets.bulkCreate(markets);
  await OperationTypes.bulkCreate(operationsTypes);
  await SignalStatus.bulkCreate(signalStatus);
  // await Users.bulkCreate(users);
}

// agregar force: true a la configuración de Sequelize
initModels()
sequelize
  .sync({ force: true })
  .then(async () => {
    // console.log('Seeding database...');
    await seedCreate();
    console.log("Seeding completed successfully.");
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
  });
