const catchError = require("../utils/catchError");
const Instruments = require("../models/Instruments");

const getAll = catchError(async (req, res) => {
  const results = await Instruments.findAll();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Instruments.create(req.body);
  return res.status(201).json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Instruments.destroy({ where: { id } });
  const instruments = await Instruments.findAll();
  return res.status(204).json(instruments);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Instruments.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  remove,
  update,
};
