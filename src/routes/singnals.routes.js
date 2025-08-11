const { getAll, create, getOne, remove, update } = require('../controllers/signals.controller');
const express = require('express');
const verifyJWT = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');
const upload = require('../utils/multer');
const { firebaseFile } = require('../middlewares/firebase.middleware');

const signalsRouter = express.Router();

signalsRouter.route('')
    .get(getAll)
    .post(upload.single("image_reference"), firebaseFile, create);

signalsRouter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, isAdmin, remove)
    .put(verifyJWT, isAdmin, upload.single("image_reference"), firebaseFile, update);

module.exports = signalsRouter;