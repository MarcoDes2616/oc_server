const isAdmin = (req, res, next) => {
  if (!req.user || req.userRole !== 1) {
    return res
      .status(403)
      .json({ error: "Sin permisos para ejecutar esta acción" });
  } else {
    req.isAdmin = true;
    next();
  }
};

module.exports = isAdmin;