const catchError = require("../utils/catchError");
const Signals = require("../models/Signals");
const Users = require("../models/Users");
const { sendPushNotification } = require("../utils/notificationService");

const getAll = catchError(async (req, res) => {
  const { 
    project_id,
    instrument_id,
    operation_type_id,
    signal_status_id
  } = req.query;

  // Construir el objeto de condiciones WHERE
  const whereClause = {};  
  if (project_id) whereClause.project_id = project_id;
  if (instrument_id) whereClause.instrument_id = instrument_id;
  if (operation_type_id) whereClause.operation_type_id = operation_type_id;
  if (signal_status_id) whereClause.signal_status_id = signal_status_id;

  // Consulta con filtros
  const results = await Signals.findAll({
    where: whereClause,
    order: [['createdAt', 'DESC']]
  });

  return res.json(results);
});
const create = catchError(async (req, res) => {
  const result = await Signals.create(req.body);

  const allUsers = await Users.findAll();
  const notifications = allUsers.map(async (user) => {
    if (user.pushToken) {
      await sendPushNotification(
        user.pushToken,
        "Nuevo post creado",
        `Has creado un nuevo post}`,
        { postId: "datos adicionales" } // Datos adicionales (opcional)
      );
    }
  });

  await Promise.all(notifications);

  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Signals.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Signals.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Signals.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
};
