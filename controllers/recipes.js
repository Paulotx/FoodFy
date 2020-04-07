const fs   = require('fs');
const data = require("../data.json");

// index 
exports.index = function(req, res) {    
    if(req.route.path == '/recipes') 
        return res.render('user/recipes', { items: data.recipes });
    
    return res.render('admin/recipes', { items: data.recipes });
}

// show
exports.show = function(req, res) {
    const index = req.params.index;

    let recipe = data.recipes[index];

    if(!recipe) {
        return res.send("Receita não encontrada!");
    }

    recipe = {
        index,
        ...recipe
    }

    if(req.route.path == "/recipes/:index")
        return res.render("user/recipe", { item: recipe });

        return res.render("admin/recipe", { item: recipe });
}

// create
exports.create = function(req, res) {
    return res.render("admin/create");
}

// post
exports.post = function(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
        if(req.body[key] == "") {
            return res.send('Please, fill all fields"');
        }      
    }

    let { title, author, image, ingredients, preparation, informations} = req.body;

    data.recipes.push({  
        title,
        author,
        image,
        ingredients,
        preparation,        
        informations
    }); 

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.sed("Write file error!");

        return res.redirect(`/admin/recipes`);
    });
}

// edit
exports.edit = function(req, res) {
    const index = req.params.index;

    let recipe = data.recipes[index];

    if(!recipe) {
        return res.send("Receita não encontrada!");
    }

    recipe = {
        ...recipe,
        index
    }

    return res.render("admin/edit", { item: recipe });
}

// put
exports.put = function(req, res) {
    const { index } = req.body;

    let searchRecipe = data.recipes[index];

    if(!searchRecipe) return res.send("Recipe not found!");

    const recipe = {
        ...searchRecipe,
        ...req.body
    }

    data.recipes[index] = recipe;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error!");

        return res.redirect(`/admin/recipes/`);
    });
}

// delete
exports.delete = function(req, res) {
    const { index } = req.body;

    let searchRecipe = data.recipes[index];

    if(!searchRecipe) return res.send("Recipe not found!");

    data.recipes.splice(index, 1);

    fs.writeFile("data.json", JSON.stringify(data, null, 2,), function(err) {
        if(err) return res.send("Write error!");

        return res.redirect(`/admin/recipes`);
    });
}