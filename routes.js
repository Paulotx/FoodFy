const express  = require('express');
const routes   = express.Router();

// Controllers
const recipes = require("./controllers/recipes");
const about   = require("./controllers/about");
const home    = require("./controllers/home");

// Home
routes.get("/", home.home);

// Recipes
routes.get("/recipes", recipes.index);
routes.get("/recipes/:index", recipes.show);

//About
routes.get("/about", about.about);

module.exports = routes;