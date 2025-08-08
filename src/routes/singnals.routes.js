const { getAll, create, getOne, remove, update } = require('../controllers/signals.controller');
const express = require('express');
const verifyJWT = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

const signalsRouter = express.Router();

signalsRouter.route('')
    .get(verifyJWT, getAll)
    .post(verifyJWT, isAdmin, create);

signalsRouter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, isAdmin, remove)
    .put(verifyJWT, isAdmin, update);

module.exports = signalsRouter;