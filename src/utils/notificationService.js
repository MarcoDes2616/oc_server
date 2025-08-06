const { Expo } = require("expo-server-sdk");
const expo = new Expo();

async function sendPushNotification(pushToken, title, body, data = {}) {
  // Verificar si el token es válido
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Token inválido: ${pushToken}`);
    return;
  }

  // Crear el mensaje
  const message = {
    to: pushToken,
    sound: "default",
    title,
    body,
    data, // Datos adicionales (opcional)
  };

  try {
    // Enviar la notificación
    const ticket = await expo.sendPushNotificationsAsync([message]);
    console.log("Notificación enviada:", ticket);
    return ticket;
  } catch (error) {
    console.error("Error al enviar notificación:", error);
    throw error;
  }
}

module.exports = { sendPushNotification };