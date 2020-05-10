const express = require("express");
const routes  = express.Router();
const multer  = require("../app/middlewares/multer");

// CONTROLLERS
const RecipeController = require("../app/controllers/RecipeController");
const ChefController   = require("../app/controllers/ChefController");

const { onlyUsers } = require("../app/middlewares/session");
const onlyAdmin  = require("../app/middlewares/onlyAdmin");

// ROUTE USER
const users = require("./users");
routes.use("/users", users);

routes.get("/recipes", onlyUsers, RecipeController.index); 
routes.get("/recipes/create", onlyUsers, RecipeController.create); 
routes.get("/recipes/:id", onlyUsers, RecipeController.show); 
routes.get("/recipes/:id/edit", onlyUsers, onlyAdmin.recipes, RecipeController.edit); 

routes.post("/recipes", onlyUsers, multer.array("photos", 5), RecipeController.post); 
routes.put("/recipes", onlyUsers, multer.array("photos", 5), RecipeController.put); 
routes.delete("/recipes", onlyUsers, RecipeController.delete); 

/*=== ADMIN - CHEFS ===*/
routes.get("/chefs", onlyUsers, ChefController.index); 
routes.get("/chefs/create", onlyUsers, onlyAdmin.chefs, ChefController.create); 
routes.get("/chefs/:id", onlyUsers, ChefController.show); 
routes.get("/chefs/:id/edit", onlyUsers, onlyAdmin.chefs, ChefController.edit); 

routes.post("/chefs", onlyUsers, multer.array("photos", 1), ChefController.post); 
routes.put("/chefs", onlyUsers, multer.array("photos", 1), ChefController.put); 
routes.delete("/chefs", onlyUsers, ChefController.delete);

module.exports = routes;