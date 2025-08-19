const catchError = require("../utils/catchError");
const Signals = require("../models/Signals");
const Users = require("../models/Users");
const { sendPushNotification } = require("../utils/notificationService");
const { SignalTaken } = require("../models/IntermediateModels");

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

  // Consulta con filtros y relaciones correctas
  const results = await Signals.findAll({
    where: whereClause,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: SignalTaken,
        include: [{
          model: Users,
          attributes: ['id', 'firstname', 'lastname']
        }]
      }
    ]
  });

  // Formatear la respuesta para incluir información de usuarios que tomaron la señal
  // const formattedResults = results.map(signal => {
  //   const signalJSON = signal.toJSON();
    
  //   // Extraer usuarios que tomaron esta señal
  //   const takenByUsers = signalJSON.takenSignals?.map(taken => taken.user) || [];
    
  //   return {
  //     ...signalJSON,
  //     takenBy: takenByUsers,
  //     takenSignals: undefined // Eliminamos el array completo de takenSignals para no duplicar info
  //   };
  // });

  return res.json(results);
});

const create = catchError(async (req, res) => {
  const data = req.body;
  data.created_by = req.userId

  const result = await Signals.create(data);

  const allUsers = await Users.findAll();
  const notifications = allUsers.map(async (user) => {
    if (user.pushToken) {
      await sendPushNotification(
        user.pushToken,
        "Nueva señal creada",
        `Has creado un nuevo post}`,
        { postId: "datos adicionales" }
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

const takeSignal = catchError(async (req, res) => {
  const { id: signalId } = req.params;
  const userId = req.userId;
  const existingRecord = await SignalTaken.findOne({
    where: { signal_id: signalId, user_id: userId }
  });
  if (existingRecord) {
    return res.status(400).json({
      success: false,
      message: 'Ya has tomado esta señal'
    });
  }
  // Crear nuevo registro
  const signalTaken = await SignalTaken.create({
    signal_id: signalId,
    user_id: userId,
    taken_at: new Date()
  });
  return res.status(200).json({
    success: true,
    message: 'Señal marcada como tomada'
  });
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  takeSignal
};