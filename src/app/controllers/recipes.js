const { date } = require("../../lib/utils");
const Recipe   = require("../model/Recipe");

module.exports = {
    
    index(req, res){
        let { filter, page, limit } = req.query;
        
        page       = page || 1;
        limit      = limit || 6;
        let offset = limit * (page - 1);

        const params = {
            filter,
            page, 
            limit,
            offset,
            callback(recipes) {

                const pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
                }  

                if(req.route.path == "/recipes") 
                    return res.render("user/recipes", { recipes, pagination, filter });
    
                return res.render("admin/recipes/recipes", { recipes });
            }
        }

        Recipe.paginate(params);                       
    },

    create(req, res){
        Recipe.chefSelectOptions(function(options) {
            return res.render('admin/recipes/create', { chefOptions: options });
        });
    },

    post(req, res){
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill all fields");
            }      
        }

        if(req.body.chef_id == 0) {
            return res.send("Plese, select a chef!");
        }

        const values = [
            req.body.chef_id,
            req.body.image,
            req.body.title,
            req.body.ingredients,
            req.body.preparation,
            req.body.informations,
            date(Date.now()).iso
        ];

        Recipe.create(values, function(recipe) {
            return res.redirect("/admin/recipes");
        });
    },

    show(req, res){
        Recipe.find(req.params.id, function(recipe) {
            if(!recipe) return res.send("Recipe not found!");

            if(req.route.path == "/recipes/:id") return res.render("user/recipe", { recipe });

            return res.render("admin/recipes/recipe", { recipe });
        });
    },

    edit(req, res){
        Recipe.find(req.params.id, function(recipe) {

            if(!recipe) return res.send("Recipe not found!");

            Recipe.chefSelectOptions(function(options) {
                return res.render('admin/recipes/edit', {recipe, chefOptions: options });
            });
        });
    },

    put(req, res){
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "") {
                return res.send('Please, fill all fields"');
            }      
        }

        if(req.body.chef_id == 0) {
            return res.send("Plese, select a chef!");
        }

        const values = [
            req.body.chef_id,
            req.body.image,
            req.body.title,
            req.body.ingredients,
            req.body.preparation,
            req.body.informations,
            req.body.id
        ];

        Recipe.update(values, function() {
            return res.redirect(`/admin/recipes/${ req.body.id }`);
        });
    },

    delete(req, res){
        Recipe.delete(req.body.id, function() {
            return res.redirect(`/admin/recipes`);
        });
    }
}