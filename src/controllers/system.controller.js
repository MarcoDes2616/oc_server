const catchError = require("../utils/catchError");
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendMail");
require("dotenv").config();
const crypto = require("crypto");
const { Op } = require("sequelize");
const { sendPushNotification } = require("../utils/notificationService");

//ENDPOINT SYSTEM 1 -- REQUEST EMAIL TOKEN
const sendAuthTokenController = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({
      where: {
        email,
        status: true,
      },
    });
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "Si el email está registrado, recibirás un token de acceso",
      });
    }
    const token = crypto.randomBytes(6).toString("hex").toUpperCase(); // 12 caracteres alfanuméricos en mayúsculas

    user.login_token = token;
    user.token_expires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos
    await user.save();
    await sendEmail({
      to: user.email,
      subject: "Tu token de acceso",
      html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Token de acceso</h2>
                    <p>Utiliza el siguiente código para iniciar sesión:</p>
                    
                    <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
                        <strong style="font-size: 24px; letter-spacing: 3px; color: #000; font-weight: bold;">${token}</strong>
                    </div>
                    
                    <p>Este código es válido por <strong>30 minutos</strong>.</p>
                    <p style="font-size: 12px; color: #777;">Si no solicitaste este token, por favor ignora este mensaje.</p>
                </div>
            `,
    });

    res.status(200).json({
      success: true,
      message: "Si el email está registrado, recibirás un token de acceso",
    });
  } catch (error) {
    console.error("Error en sendAuthTokenController:", error);
    res.status(500).json({
      success: false,
      message: "Error al procesar la solicitud",
    });
  }
};

//ENDPOINT SYSTEM 2 --- LOGIN
const login = catchError(async (req, res) => {
  const { email, login_token } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        email,
        login_token,
        token_expires: { [Op.gt]: new Date() }, // Token aún válido
        status: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token inválido o expirado",
      });
    }

    const authToken = jwt.sign({ user }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });

    const newTokenExpires = new Date();
    newTokenExpires.setDate(newTokenExpires.getDate() + 7);

    await user.update({
      last_login: new Date(),
      token_expires: newTokenExpires,
    });

    const userData = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      telegram_user: user.telegram_user,
    };

    res.status(200).json({
      success: true,
      message: "Autenticación exitosa",
      token: authToken,
      user: userData,
    });
  } catch (error) {
    console.error("Error en loginWithTokenController:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
});

// ENDPOINT DEL SISTEMA 3 --- OBTENER USUARIO LOGUEADO
const getMe = catchError(async (req, res) => {
  const { id } = req.user;
  const sessionAge = req.iat;
  const user = await Users.findByPk(id);
  if (user.passwordChangeAt > sessionAge || !user.status) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await user.update({
    login_token: null,
    token_expires: null,
  });

  res.json({
    success: true,
    user,
  });
});

// ENDPOINT SYSTEM 4 --- VERIFY ADMIN
const verifyAdmin = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  const { user } = jwt.verify(token, process.env.TOKEN_SECRET);
  if (user.roleId !== 1 || !user.status) {
    const resu = await Users.update(
      {status: false},
      { where: {id: user.id}, returning: true }
  )
    return res.status(401).json({ message: "Unauthorized" });
  }
  return res.status(200)
};

// ENDPOINT SYSTEM 5 --- SAVE TOKEN FOR PUSH NOTIFICATIONS
const savePushToken = async (req, res) => {
  try {
    const { userId, pushToken } = req.body;

    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.pushToken = pushToken;
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar el token push" });
  }
};

// ENDPOINT SYSTEM 6 --- SEND CUSTOM NOTIFICATION
const sendCustomNotification = async (req, res) => { 
  try {
    const { title, message, data } = req.body;
    const allUsers = await Users.findAll();
    const notifications = allUsers.map(async (user) => {
      if (user.pushToken) {
        await sendPushNotification(user.pushToken, title, message, data);
      }
    });
    await Promise.all(notifications);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al enviar notificaciones" });
  }
};

module.exports = {
  login,
  sendAuthTokenController,
  getMe,
  verifyAdmin,
  savePushToken,
  sendCustomNotification
};
