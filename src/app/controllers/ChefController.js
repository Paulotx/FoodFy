const { date } = require("../../lib/utils");
const Chef     = require("../model/Chef.js");
const Recipe   = require("../model/Recipe");
const File     = require("../model/File");

module.exports = {
    
    async index(req, res){ 
        let results = await Chef.all();
        let chefs = results.rows;

        chefs = chefs.map(async chef => {
            const results = await Chef.files(chef.file_id);
            const files = results.rows.map(file => ({
                ...file,
                src: `${ req.protocol }://${ req.headers.host }${ file.path.replace("public", "") }`
            }));

            return {
                ...chef,
                file: files[0]
            }            
        });

        chefs = await Promise.all(chefs);

        if(req._parsedOriginalUrl.path == "/chefs")
            return res.render("site/chefs", { chefs }); 

        return res.render("admin/chefs/chefs", { chefs });     
    },

    create(req, res){
        return res.render('admin/chefs/create');
    },

    async post(req, res){
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill all fields");
            }      
        }

        if(req.files.lenght == 0) return res.send("Please, send one image!");

        const results = await File.create([ req.files[0].filename, req.files[0].path, req.session.userId ]);
        const fileID = results.rows[0].id;

        const values = [
            req.body.name,
            fileID,
            date(Date.now()).iso 
        ];

        await Chef.create(values);

        return res.redirect("/admin/chefs"); 
    },

    async show(req, res){
        let results = await Chef.find(req.params.id);
        let chef    = results.rows[0];

        results    = await Chef.chefFile(chef.file_id);
        const file = results.rows[0];

        chef = {
            ...chef,
            fileName: file.name,
            fileSrc: `${ req.protocol }://${ req.headers.host }${ file.path.replace("public", "") }`
        }

        results = await Chef.chefRecipes(req.params.id);
        let recipes = results.rows;

        const recipesPromise = recipes.map(async recipe => {
            const results = await Chef.filesRecipe(recipe.id);
            const files = results.rows.map(file => ({
                file: file.name,
                src: `${ req.protocol }://${ req.headers.host }${ file.path.replace("public", "") }`
            }));

            return {
                id: recipe.id,
                title: recipe.title,
                ...files
            }
        }) 

        recipes = await Promise.all(recipesPromise);

        if(req._parsedOriginalUrl.path == `/chefs/${ req.params.id }`)
            return res.render("site/chef", { chef, recipes }); 
        
        return res.render("admin/chefs/chef", { chef, recipes });        
    },

    async edit(req, res){

        let results = await Chef.find(req.params.id);    
        let chef = results.rows[0];

        results = await Chef.files(chef.file_id);
        let file = results.rows[0];

        chef = {
            ...chef,
            file: {
                id: file.id,
                name: file.name,
                src: `${ req.protocol }://${ req.headers.host }${ file.path.replace("public", "") }`
            }
        }

        if(!chef) return res.send("Chef not found!");

            return res.render("admin/chefs/edit", { chef, file });
    },

    async put(req, res){
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "" && key != "removed_files") {
                return res.send('Please, fill all fields"');
            }      
        }

        if(req.body.removed_files) {

            if(req.files.length != 0) {
                const results = await File.create([ req.files[0].filename, req.files[0].path, req.session.userId ]);
                const fileID = results.rows[0].id;

                const values = [
                    req.body.name,
                    fileID,
                    req.body.id
                ];
        
                await Chef.update(values);
            }

            const removedFile = req.body.removed_files.split(",");
            const index = removedFile.length - 1;
            removedFile.splice(index, 1);
            await File.delete(removedFile[index - 1]);

            return res.redirect(`/admin/chefs/${ req.body.id }`);
        }

        const values = [
            req.body.name,
            req.body.current_photo,
            req.body.id
        ];

        await Chef.update(values);

        return res.redirect(`/admin/chefs/${ req.body.id }`);
    },

    async delete(req, res){
        let results = await Chef.numberOfChefRecipes(req.body.id);
        const numberRecipes = results.rows[0];

        if(numberRecipes.count == 0) {
            const results = await Chef.find(req.body.id);
            const chef = results.rows[0];
            
            await Chef.delete(req.body.id);

            await File.delete(chef.file_id);

            return res.redirect(`/admin/chefs`);
        }

        results = await Chef.find(req.body.id);
        let chef    = results.rows[0];

        results    = await Chef.chefFile(chef.file_id);
        const file = results.rows[0];

        chef = {
            ...chef,
            file: {
                name: file.name,
                src: `${ req.protocol }://${ req.headers.host }${ file.path.replace("public", "") }`
            }
        }

        return res.render("admin/chefs/edit", {
            chef,
            error: "Chefe não pode ser excluido, pois ele possui receitas!"
        });          
    }
}