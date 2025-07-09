const sequelize = require("../utils/connection");
const Roles = require("../models/Roles");
const Instruments = require("../models/Instruments");
const Markets = require("../models/Markets");
const OperationTypes = require("../models/OperationType");
const SignalStatus = require("../models/SignalStatus");
// const Users = require("../models/Users");
const initModels = require('../models');
const Users = require("../models/Users");

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

const usersData = [
  {
    firstname: "Marco",
    lastname: "Cardenas",
    username: "marcoc",
    email: "marco2616@gmail.com",
    role_id: 1,
    sign_declare: true,
    password: "hashedpassword1",
    reset_code: null,
    password_change_at: null,
    created_at: new Date("2025-01-15T10:00:00Z"),
    status: true,
    telegram_user: "Mrk_als",
  },
  {
    firstname: "Ana",
    lastname: "Gómez",
    username: "anag",
    email: "ana.gomez@example.com",
    role_id: 2,
    sign_declare: false,
    password: "hashedpassword2",
    reset_code: "ABC123",
    password_change_at: new Date("2025-06-01T14:30:00Z"),
    created_at: new Date("2025-03-20T08:15:00Z"),
    status: true,
    telegram_user: null,
  },
  {
    firstname: "Carlos",
    lastname: "Ramírez",
    username: "carlr",
    email: "carlos.ramirez@example.com",
    role_id: 2,
    sign_declare: true,
    password: "hashedpassword3",
    reset_code: null,
    password_change_at: null,
    created_at: new Date("2025-05-10T12:00:00Z"),
    status: false,
    telegram_user: "carlos_telegram",
  },
  {
    firstname: "Laura",
    lastname: "Martínez",
    username: "lauram",
    email: "laura.martinez@example.com",
    role_id: 2,
    sign_declare: true,
    password: "hashedpassword4",
    reset_code: "XYZ789",
    password_change_at: new Date("2025-07-01T09:45:00Z"),
    created_at: new Date("2025-04-25T16:20:00Z"),
    status: true,
    telegram_user: null,
  },
];



async function seedCreate() {
  await Roles.bulkCreate(role);
  await Instruments.bulkCreate(instruments);
  await Markets.bulkCreate(markets);
  await OperationTypes.bulkCreate(operationsTypes);
  await SignalStatus.bulkCreate(signalStatus);
  await Users.bulkCreate(usersData);
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
