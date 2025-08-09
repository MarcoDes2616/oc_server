const isAdmin = (req, res, next) => {
  if (!req.user || req.userRole !== 1) {
    return res
      .status(403)
      .json({ error: "No tienes permiso para enviar notificaciones" });
  } else {
    req.isAdmin = true;
    next();
  }
};

module.exports = isAdmin;