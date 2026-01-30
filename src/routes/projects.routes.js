const { getAll, create, getOne, remove, update } = require('../controllers/projects.controller');
const express = require('express');
const verifyJWT = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

const projectsRouter = express.Router();

projectsRouter.route('')
    .get(getAll)
    .post(verifyJWT, isAdmin, create);

projectsRouter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, isAdmin, remove)
    .put(verifyJWT, isAdmin, update);

module.exports = projectsRouter;