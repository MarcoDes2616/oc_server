const { getAll, create, getOne, remove, update } = require('../controllers/signals.controller');
const express = require('express');

const signalsRouter = express.Router();

signalsRouter.route('')
    .get(getAll)
    .post(create);

signalsRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = signalsRouter;