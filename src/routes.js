const express  = require('express');
const routes   = express.Router();

// Controllers
const recipes = require("./app/controllers/recipes");
const about   = require("./app/controllers/about");
const home    = require("./app/controllers/home");
const chefs   = require("./app/controllers/chefs");

/*=== USER ===*/
// Home
routes.get("/", home.home);

// Recipes
routes.get("/recipes", recipes.index);
routes.get("/recipes/:id", recipes.show);

//About
routes.get("/about", about.about);

routes.get("/chefs", chefs.index);
routes.get("/chefs/:id", chefs.show);

/*=== ADMIN ===*/
routes.get("/admin/recipes", recipes.index); 
routes.get("/admin/recipes/create", recipes.create); 
routes.get("/admin/recipes/:id", recipes.show); 
routes.get("/admin/recipes/:id/edit", recipes.edit); 

routes.post("/admin/recipes", recipes.post); 
routes.put("/admin/recipes", recipes.put); 
routes.delete("/admin/recipes", recipes.delete); 

/*=== ADMIN - CHEFS ===*/
routes.get("/admin/chefs", chefs.index); 
routes.get("/admin/chefs/create", chefs.create); 
routes.get("/admin/chefs/:id", chefs.show); 
routes.get("/admin/chefs/:id/edit", chefs.edit); 

routes.post("/admin/chefs", chefs.post); 
routes.put("/admin/chefs", chefs.put); 
routes.delete("/admin/chefs", chefs.delete); 

module.exports = routes;