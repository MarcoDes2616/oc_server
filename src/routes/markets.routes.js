const { getAll, create, getOne, remove, update } = require('../controllers/markets.controller');
const express = require('express');

const marketsRouter = express.Router();

marketsRouter.route('')
    .get(getAll)
    .post(create);

marketsRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = marketsRouter;