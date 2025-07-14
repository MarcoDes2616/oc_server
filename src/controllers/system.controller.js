const catchError = require("../utils/catchError");
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendMail");
require("dotenv").config();
const crypto = require("crypto");
const { Op } = require("sequelize");
// const { guardarFormulario, obtenerRegistros } = require("../utils/firebase");
// const { welcomeEmail } = require("../utils/welcomeEmail");

//REQUEST EMAIL TOKEN
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

//ENDPOINT SYSTEM 1 --- LOGIN
const login = catchError(async (req, res) => {
  const { email, login_token } = req.body;

  try {
    // 1. Buscar usuario con token válido
    const user = await Users.findOne({
      where: {
        email,
        login_token,
        token_expires: { [Op.gt]: new Date() },
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

    await user.update({
      last_login: new Date(),
      login_token: null,
      token_expires: null,
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

// ENDPOINT DEL SISTEMA 4 --- OBTENER USUARIO LOGUEADO
const getMe = catchError(async (req, res) => {
  const { id } = req.user;
  const sessionAge = req.iat;
  const user = await Users.findByPk(id);
  if (user.passwordChangeAt > sessionAge || !user.status)
    return res.status(401).json({ message: "Unauthorized" });
  res.json({ success: true, user });
});

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

module.exports = {
  login,
  sendAuthTokenController,
  getMe,
  verifyAdmin,
};
