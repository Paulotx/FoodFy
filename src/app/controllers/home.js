
const Recipe = require("../model/Recipe");

exports.home = function(req, res) {

    Recipe.all(function(recipes) {
        if(req.route.path == "/recipes") 
            return res.render("user/recipes", { recipes });

        recipes = recipes.reverse()
        
        return res.render("user/index", { recipes }); 
    });
    //return res.render('user/index');
}