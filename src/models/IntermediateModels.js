const sequelize = require("../utils/connection");

const InstrumentTarget = sequelize.define("instrument_target", {}, { timestamps: false });
const UserProyect = sequelize.define("user_proyect", {}, { timestamps: false });
const SignalTaken = sequelize.define("signal_taken", {}, { timestamps: false });

module.exports = { InstrumentTarget, UserProyect, SignalTaken };