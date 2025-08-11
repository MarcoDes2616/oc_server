const jwt = require('jsonwebtoken');
const Users = require("../models/Users");
require('dotenv').config();

const verifyJWT = async (req, res, next) => {
  next();
};

module.exports = verifyJWT;