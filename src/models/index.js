const Users = require("./Users");
const Role = require("./Role");
const Market = require("./Market");
const Project = require("./Project");
const UserProyect = require("./UserProyect");
const Signals = require("./Signals");
const SignalTaken = require("./SignalTaken");
const OperationType = require("./OperationType");
const SignalStatus = require("./SignalStatus");
const OperationalBook = require("./OperationalBook");
const Instrument = require("./Instrument");
const InstrumentTarget = require("./InstrumentTarget");

const initModels = () => {
  // Role 1 ----- * Users
  Role.hasMany(Users, { foreignKey: "role_id" });
  Users.belongsTo(Role, { foreignKey: "role_id" });

  // Market 1 ----- * Project
  Market.hasMany(Project, { foreignKey: "market_id" });
  Project.belongsTo(Market, { foreignKey: "market_id" });

  // Users 1 ----- * UserProyect
  Users.hasMany(UserProyect, { foreignKey: "user_id" });
  UserProyect.belongsTo(Users, { foreignKey: "user_id" });

  // Project 1 ----- * UserProyect
  Project.hasMany(UserProyect, { foreignKey: "project_id" });
  UserProyect.belongsTo(Project, { foreignKey: "project_id" });

  // Project 1 ----- * Signals
  Project.hasMany(Signals, { foreignKey: "project_id" });
  Signals.belongsTo(Project, { foreignKey: "project_id" });

  // Users 1 ----- * SignalTaken
  Users.hasMany(SignalTaken, { foreignKey: "user_id" });
  SignalTaken.belongsTo(Users, { foreignKey: "user_id" });

  // Signals 1 ----- * SignalTaken
  Signals.hasMany(SignalTaken, { foreignKey: "signal_id" });
  SignalTaken.belongsTo(Signals, { foreignKey: "signal_id" });

  // OperationType 1 ----- * Signals
  OperationType.hasMany(Signals, { foreignKey: "operation_type_id" });
  Signals.belongsTo(OperationType, { foreignKey: "operation_type_id" });

  // SignalStatus 1 ----- * Signals
  SignalStatus.hasMany(Signals, { foreignKey: "signal_status_id" });
  Signals.belongsTo(SignalStatus, { foreignKey: "signal_status_id" });

  // Users 1 ----- * OperationalBook
  Users.hasMany(OperationalBook, { foreignKey: "user_id" });
  OperationalBook.belongsTo(Users, { foreignKey: "user_id" });

  // Project 1 ----- * OperationalBook
  Project.hasMany(OperationalBook, { foreignKey: "project_id" });
  OperationalBook.belongsTo(Project, { foreignKey: "project_id" });

  // Signals 1 ----- * OperationalBook
  Signals.hasMany(OperationalBook, { foreignKey: "signal_id" });
  OperationalBook.belongsTo(Signals, { foreignKey: "signal_id" });

  // OperationType 1 ----- * OperationalBook
  OperationType.hasMany(OperationalBook, { foreignKey: "operation_type_id" });
  OperationalBook.belongsTo(OperationType, { foreignKey: "operation_type_id" });

  // Instrument 1 ----- * OperationalBook
  Instrument.hasMany(OperationalBook, { foreignKey: "instrument_id" });
  OperationalBook.belongsTo(Instrument, { foreignKey: "instrument_id" });

  // Project 1 ----- * InstrumentTarget
  Project.hasMany(InstrumentTarget, { foreignKey: "project_id" });
  InstrumentTarget.belongsTo(Project, { foreignKey: "project_id" });

  // Instrument 1 ----- * InstrumentTarget
  Instrument.hasMany(InstrumentTarget, { foreignKey: "instrument_id" });
  InstrumentTarget.belongsTo(Instrument, { foreignKey: "instrument_id" });

  // Instrument 1 ----- * Signals
  Instrument.hasMany(Signals, { foreignKey: "instrument_id" });
  Signals.belongsTo(Instrument, { foreignKey: "instrument_id" });
};

module.exports = initModels;