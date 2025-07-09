const { getAll, create, getOne, remove, update } = require('../controllers/users.controller');
const express = require('express');

const usersRouter = express.Router();

usersRouter.route('')
    .get(getAll)
    .post(create);

usersRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = usersRouter;