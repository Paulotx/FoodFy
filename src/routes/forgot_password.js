const express = require("express");
const routes  = express.Router();

const SessionController = require("../app/controllers/SessionController");
const Validator = require("../app//validators/session");

routes.get("/", SessionController.forgotForm);
routes.post("/", Validator.forgot, SessionController.forgot);

module.exports = routes;