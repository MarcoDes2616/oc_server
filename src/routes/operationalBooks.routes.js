const { getAll, create, getOne, remove, update } = require('../controllers/operationalBooks.controller');
const express = require('express');

const operationalBooksRouter = express.Router();

operationalBooksRouter.route('')
    .get(getAll)
    .post(create);

operationalBooksRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = operationalBooksRouter;