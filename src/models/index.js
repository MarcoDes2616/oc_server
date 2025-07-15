const Users = require("./Users");
const Roles = require("./Roles");
const Markets = require("./Markets");
const Projects = require("./Projects");
const Signals = require("./Signals");
const OperationType = require("./OperationType");
const SignalStatus = require("./SignalStatus");
const OperationalBooks = require("./OperationalBooks");
const Instruments = require("./Instruments");
const { InstrumentTarget, UserProyect, SignalTaken } = require("./IntermediateModels");
const AccountDetail = require("./AccountDetail");

const initModels = () => {
  // Role 1 ----- * Users
  Roles.hasMany(Users, { foreignKey: "role_id" });
  Users.belongsTo(Roles, { foreignKey: "role_id" });

  // Market 1 ----- * Project
  Markets.hasMany(Projects, { foreignKey: "market_id" });
  Projects.belongsTo(Markets, { foreignKey: "market_id" });

  // Users 1 ----- * UserProyect
  Users.hasMany(UserProyect, { foreignKey: "user_id" });
  UserProyect.belongsTo(Users, { foreignKey: "user_id" });

  // Project 1 ----- * UserProyect
  Projects.hasMany(UserProyect, { foreignKey: "project_id" });
  UserProyect.belongsTo(Projects, { foreignKey: "project_id" });

  // Project 1 ----- * Signals
  Projects.hasMany(Signals, { foreignKey: "project_id" });
  Signals.belongsTo(Projects, { foreignKey: "project_id" });

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
  Users.hasMany(OperationalBooks, { foreignKey: "user_id" });
  OperationalBooks.belongsTo(Users, { foreignKey: "user_id" });

  // Project 1 ----- * OperationalBook
  Projects.hasMany(OperationalBooks, { foreignKey: "project_id" });
  OperationalBooks.belongsTo(Projects, { foreignKey: "project_id" });

  // Signals 1 ----- * OperationalBook
  Signals.hasMany(OperationalBooks, { foreignKey: "signal_id" });
  OperationalBooks.belongsTo(Signals, { foreignKey: "signal_id" });

  // OperationType 1 ----- * OperationalBook
  OperationType.hasMany(OperationalBooks, { foreignKey: "operation_type_id" });
  OperationalBooks.belongsTo(OperationType, { foreignKey: "operation_type_id" });

  // Instrument 1 ----- * OperationalBook
  Instruments.hasMany(OperationalBooks, { foreignKey: "instrument_id" });
  OperationalBooks.belongsTo(Instruments, { foreignKey: "instrument_id" });

  // Project 1 ----- * InstrumentTarget
  Projects.hasMany(InstrumentTarget, { foreignKey: "project_id" });
  InstrumentTarget.belongsTo(Projects, { foreignKey: "project_id" });

  // Instrument 1 ----- * InstrumentTarget
  Instruments.hasMany(InstrumentTarget, { foreignKey: "instrument_id" });
  InstrumentTarget.belongsTo(Instruments, { foreignKey: "instrument_id" });

  // Instrument 1 ----- * Signals
  Instruments.hasMany(Signals, { foreignKey: "instrument_id" });
  Signals.belongsTo(Instruments, { foreignKey: "instrument_id" });
  
  // Users 1 ----- * AccountDetail
  Users.hasMany(AccountDetail, { foreignKey: "user_id" });
  AccountDetail.belongsTo(Users, { foreignKey: "user_id" });

};

module.exports = initModels;