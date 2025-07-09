const { getAll, create, getOne, remove, update } = require('../controllers/projects.controller');
const express = require('express');

const projectsRouter = express.Router();

projectsRouter.route('')
    .get(getAll)
    .post(create);

projectsRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = projectsRouter;