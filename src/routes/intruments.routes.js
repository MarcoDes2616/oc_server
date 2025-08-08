const { getAll, create, remove, update } = require('../controllers/instruments.controller');
const express = require('express');

const instrumentsRouter = express.Router();

instrumentsRouter.route('')
    .get(verifyJWT, isAdmin, getAll)
    .post(verifyJWT, isAdmin, create);

instrumentsRouter.route('/:id')
    .delete(verifyJWT, isAdmin, remove)
    .put(verifyJWT, isAdmin, update);

module.exports = instrumentsRouter;