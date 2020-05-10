const express = require("express");
const routes  = express.Router();

const SessionController = require("../app/controllers/SessionController");
const Validator = require("../app//validators/session");

routes.get("/", SessionController.resetForm);
routes.post("/", Validator.reset, SessionController.reset);

module.exports = routes;