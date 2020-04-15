
const Recipe = require("../model/Recipe");

exports.home = function(req, res) {

    Recipe.all(function(recipes) {      
        return res.render("user/index", { recipes }); 
    });
    //return res.render('user/index');
}