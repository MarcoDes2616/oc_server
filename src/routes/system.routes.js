const { login, sendAuthTokenController, getMe, savePushToken, sendCustomNotification} = require('../controllers/system.controller');
const express = require('express');
const verifyJWT = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

const systemRouter = express.Router();

systemRouter.route("/login")
    .post(login)

systemRouter.route("/request_auth_token")
    .post(sendAuthTokenController)

systemRouter.route("/me")
    .get(verifyJWT, getMe)

systemRouter.route("/save-push-token")
    .post(savePushToken)

systemRouter.route("/send-custom-notification")
    .post(sendCustomNotification)   

// systemRouter.route("/update_password")
//     .post(updatePassword)

// systemRouter.route("/verify_email")
//     .post(requestEmailVerification)

// systemRouter.route("/send_form")
//     .post(handleSaveForm)

// systemRouter.route("/get_registre")
//     .get(isAdmin, handleGetUsers)

// systemRouter.route("/verifyAdmin")
//     .get(verifyAdmin)

// systemRouter.route("/verify_email/:token")
//     .get(verifyEmail)



module.exports = systemRouter;