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

    //const id = Number(data.recipes.length + 1);

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

        return res.redirect(`/admin/recipes/${ data.recipes.length - 1 }`);
    });
}

// edit
exports.edit = function(req, res) {
    const index = req.params.index;

    const recipe = data.recipes[index];

    if(!recipe) {
        return res.send("Receita não encontrada!");
    }

    return res.render("admin/edit", { item: recipe });
}


// put
exports.put = function(res, req) {
    return res.send("PUT");
}

// delete
exports.delete = function(res, req) {
    return res.send("DELETE");
}