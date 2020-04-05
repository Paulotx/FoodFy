const recipes = require("../data");

// index 
exports.index = function(req, res) {    
    if(req.route.path == '/recipes') 
        return res.render('user/recipes', { items: recipes });
    
    return res.render('admin/recipes', { items: recipes });
}

// show
exports.show = function(req, res) {
    const index = req.params.index;

    let recipe = recipes[index];

    recipe = {
        index,
        ...recipe
    }

    if(!recipe) {
        return res.send("Receita não encontrada!");
    }

    if(req.route.path == "/recipes/:index")
        return res.render("user/recipe", { item: recipe });

        return res.render("admin/recipe", { item: recipe });
}

// create
exports.create = function(req, res) {
    return res.send("Create!");
}

// edit
exports.edit = function(req, res) {
    const index = req.params.index;

    const recipe = recipes[index];

    if(!recipe) {
        return res.send("Receita não encontrada!");
    }

    return res.render("admin/edit", { item: recipe });
}

// post
exports.post = function(res, req) {
    return res.send("POST");
}

// put
exports.put = function(res, req) {
    return res.send("PUT");
}

// delete
exports.delete = function(res, req) {
    return res.send("DELETE");
}