const express = require("express");
const routes  = express.Router();

const SessionController = require("../app/controllers/SessionController");

const Validator = require("../app/validators/session");

routes.get("/", SessionController.loginForm);
routes.post("/", Validator.login, SessionController.login);

module.exports = routes;