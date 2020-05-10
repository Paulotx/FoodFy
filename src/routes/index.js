const express = require("express");
const routes  = express.Router();

// Controllers
const RecipeController = require("../app/controllers/RecipeController");
const AboutController  = require("../app/controllers/AboutController");
const HomeController   = require("../app/controllers/HomeController");
const ChefController   = require("../app/controllers/ChefController");
const UserController   = require("../app/controllers/UserController");

const admin = require("./admin");
routes.use("/admin", admin);

const login = require("./login");
routes.use("/login", login);

const logout = require("./logout");
routes.use("/logout", logout);

const forgot_password = require("./forgot_password");
routes.use("/forgot-password", forgot_password);

const reset_password = require("./reset_password");
routes.use("/reset-password", reset_password);

// Home
routes.get("/", HomeController.home);

// SITE
routes.get("/recipes", RecipeController.index);
routes.get("/recipes/:id", RecipeController.show);
routes.get("/about", AboutController.about);
routes.get("/chefs", ChefController.index);
routes.get("/chefs/:id", ChefController.show);

routes.get("/account", UserController.account)

module.exports = routes;