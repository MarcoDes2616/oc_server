const sequelize = require("../utils/connection");
const Users = require("../models/Users");
const Role = require("../models/Role");
const initModels = require('../models');
const Tags = require("../models/Tags");

const role = [{ role: "Admin" }, { role: "usuario" }];

const tag = [{tag: "Trading"}, {tag: "Análisis"}, {tag: "Resultados"}, {tag: "Clases"}, {tag: "Gestión"}, {tag: "Señales"}]

const users = [
  {
    name: "Marco",
    lastname: "Cardenas",
    email: "marco2616@gmail.com",
    birthday: "1983-04-05",
    documentNumber: "16261755",
    signDeclare: true,
    roleId: 1,
  },
  
];


async function seedCreate() {
  await Role.bulkCreate(role);
  await Tags.bulkCreate(tag);
  await Users.bulkCreate(users);
}

// agregar force: true a la configuración de Sequelize
initModels()
sequelize
  .sync({ force: true })
  .then(async () => {
    // console.log('Seeding database...');
    await seedCreate();
    console.log("Seeding completed successfully.");
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
  });
