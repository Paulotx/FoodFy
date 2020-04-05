const recipes = require("../data");

exports.home = function(req, res) {
    let firtsRecipes = [];

    for(let i = 0; i < recipes.length - 6; i++){
        firtsRecipes.push(recipes[i]);
    }

    return res.render('user/index', { items: firtsRecipes });
}