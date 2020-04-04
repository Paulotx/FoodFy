const recipes = require("../data");

//index 
exports.index = function(req, res) {
    return res.render('recipes', { items: recipes });
}

//show
exports.show = function(req, res) {
    const index = req.params.index;

    const recipe = recipes[index]

    if(!recipe) {
        return res.send("Receita não encontrada!");
    }

    return res.render("recipe", { item: recipe });
}
