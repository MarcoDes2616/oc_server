const { getAll, create, getOne, remove, update } = require('../controllers/operationalBooks.controller');
const express = require('express');
const verifyJWT = require('../middlewares/auth.middleware');

const operationalBooksRouter = express.Router();

operationalBooksRouter.route('')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

operationalBooksRouter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = operationalBooksRouter;