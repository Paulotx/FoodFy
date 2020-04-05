const express  = require('express');
const routes   = express.Router();

// Controllers
const recipes = require("./controllers/recipes");
const about   = require("./controllers/about");
const home    = require("./controllers/home");

/*=== USER ===*/
// Home
routes.get("/", home.home);

// Recipes
routes.get("/recipes", recipes.index);
routes.get("/recipes/:index", recipes.show);

//About
routes.get("/about", about.about);

/*=== ADMIN ===*/
routes.get("/admin/recipes", recipes.index); 
routes.get("/admin/recipes/create", recipes.create); 
routes.get("/admin/recipes/:index", recipes.show); 
routes.get("/admin/recipes/:id/edit", recipes.edit); 

routes.post("/admin/recipes", recipes.post); 
routes.put("/admin/recipes", recipes.put); 
routes.delete("/admin/recipes", recipes.delete); 

module.exports = routes;