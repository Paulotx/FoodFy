const express = require("express");
const routes  = express.Router();

const UserController = require("../app/controllers/UserController");

const Validator = require("../app/validators/user");
const onlyAdmin = require("../app/middlewares/onlyAdmin");
const { onlyUsers } = require("../app/middlewares/session");

// user register UserController
routes.get("/register", onlyUsers, UserController.registerForm);
routes.post("/register", onlyUsers, Validator.post, UserController.post);

routes.get("/", onlyUsers, UserController.index);
routes.get("/:id", onlyUsers, onlyAdmin.users, Validator.show, UserController.show);
routes.put("/", onlyUsers, Validator.update, UserController.update);
routes.delete("/", Validator.remove, onlyUsers, onlyAdmin.users, UserController.delete);

module.exports = routes;