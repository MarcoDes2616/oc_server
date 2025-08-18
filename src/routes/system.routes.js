const {
  login,
  sendAuthTokenController,
  getMe,
  savePushToken,
  sendCustomNotification,
  deletePushToken,
  logout
} = require("../controllers/system.controller");
const express = require("express");
const verifyJWT = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");
const loginValidator = require("../middlewares/loginValidator.middleware");

const systemRouter = express.Router();

systemRouter.route("/login").post(loginValidator, login);

systemRouter.route("/request_auth_token").post(sendAuthTokenController);

systemRouter.route("/me").get(verifyJWT, getMe);

systemRouter.route("/save-push-token").post(savePushToken);

systemRouter.route("/delete-push-token").post(verifyJWT, deletePushToken);

systemRouter.route("/logout").post(verifyJWT, logout)

systemRouter
  .route("/send-custom-notification")
  .post(verifyJWT, isAdmin, sendCustomNotification);

module.exports = systemRouter;
