const { date } = require("../../lib/utils");
const Chef   = require("../model/Chef.js");

module.exports = {
    
    index(req, res){
        return res.render("admin/chefs/chefs");                      
    },

    create(req, res){
        return res.render("admin/chefs/create");
    },

    post(req, res){
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill all fields");
            }      
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

        Chef.create(values, function(chef) {
            return res.redirect("/admin/chefs");
        });
    },

    show(req, res){
        Chef.find(req.params.id, function(chef) {

            if(!chef) return res.send("Chef not found!");

            if(req.route.path == "/chefs/:id") return res.render("user/chef", { chef });

            return res.render("admin/chefs/chef", { chef });
        });
    },

    edit(req, res){

        return res.render("admin/chefs/edit");

    },

    put(req, res){
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "") {
                return res.send('Please, fill all fields"');
            }      
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

        Chef.update(values, function() {
            return res.redirect(`/admin/chefs/${ req.body.id }`);
        });
    },

    delete(req, res){
        Chef.delete(req.body.id, function() {
            return res.redirect(`/admin/chefs`);
        });
    }
}