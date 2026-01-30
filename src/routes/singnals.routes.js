const { getAll, create, getOne, remove, update, takeSignal } = require('../controllers/signals.controller');
const express = require('express');
const verifyJWT = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');
const upload = require('../utils/multer');
const { firebaseFile } = require('../middlewares/firebase.middleware');

const signalsRouter = express.Router();

signalsRouter.route('')
    .get(getAll)
    .post(verifyJWT, isAdmin, upload.single("image_reference"), firebaseFile, create);

signalsRouter.route('/:id/take')
    .post(verifyJWT, takeSignal);

signalsRouter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, isAdmin, remove)
    .put(verifyJWT, isAdmin, upload.single("image_reference"), firebaseFile, update);

module.exports = signalsRouter;