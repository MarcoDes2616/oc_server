const express = require('express');
const usersRouter = require('./users.routes');
const projectsRouter = require('./projects.routes');
const marketsRouter = require('./markets.routes');
const instrumentsRouter = require('./intruments.routes');
const operationalBooksRouter = require('./operationalBooks.routes');
const signalsRouter = require('./singnals.routes');
const systemRouter = require('./system.routes');
const router = express.Router();

// colocar las rutas aquí
router.use("/users", usersRouter);
router.use("/projects", projectsRouter)
router.use("/markets", marketsRouter);
router.use("/instruments", instrumentsRouter);
router.use("/operational_books", operationalBooksRouter);
router.use("/signals", signalsRouter)
router.use("/system", systemRouter)


module.exports = router;