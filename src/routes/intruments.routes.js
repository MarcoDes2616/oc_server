const { getAll, create, getOne, remove, update } = require('../controllers/instruments.controller');
const express = require('express');

const instrumentsRouter = express.Router();

instrumentsRouter.route('')
    .get(getAll)
    .post(create);

instrumentsRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = instrumentsRouter;