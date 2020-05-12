const { date }   = require("../../lib/utils");
const Recipe     = require("../model/Recipe");
const File       = require("../model/File");
const RecipeFile = require("../model/RecipeFile");

module.exports = {
    async index(req, res){
        try {
            let { filter, page, limit } = req.query;
        
            page       = page || 1;
            limit      = limit || 6;
            let offset = limit * (page - 1);

            const params = {
                filter,
                page, 
                limit,
                offset
            }

            let results = await Recipe.paginate(params);
            let recipes = results.rows;

            let pagination;
            if(recipes.length > 0) {

                pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
                }

            }        

            recipes = recipes.map(async recipe => {
                const results = await Recipe.files(recipe.id);
                const files = results.rows.map(file => ({
                    name: file.name,
                    src: `${ req.protocol }://${ req.headers.host }${ file.path.replace("public", "") }`
                }));

                return {
                    ...recipe,
                    file: files[0]
                }            
            });

            recipes = await Promise.all(recipes);

            if(req._parsedOriginalUrl.path == "/recipes" || req._parsedOriginalUrl.path == `/recipes?filter=${ filter }` || req._parsedOriginalUrl.path == `/recipes?page=${ page }` || req._parsedOriginalUrl.path == `/recipes?page=${ page }&filter=${ filter }`) {
                if(recipes.length > 0){
                    return res.render("site/recipes", { recipes, pagination, filter });
                }                
                return res.render("site/recipes");
            }            
                
            if(recipes.length > 0) 
                return res.render("admin/recipes/recipes", { recipes, pagination, filter });
            
            return res.render("admin/recipes/recipes");
        } 
        catch (err) {
            console.error(err);
        }
    },

    async create(req, res){
        const result  = await Recipe.chefSelectOptions();
        const options = result.rows;

        return res.render('admin/recipes/create', { chefOptions: options });
    },

    async post(req, res){
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill all fields");
            }      
        }

        if(req.body.chef_id == 0) return res.send("Plese, select a chef!");

        if(req.files.lenght == 0) return res.send("Please, send at least one image!");

        let values = [
            req.body.chef_id,
            req.body.title,
            req.body.ingredients,
            req.body.preparation,
            req.body.informations,
            date(Date.now()).iso,
            req.session.userId
        ];

        const filesPromise = req.files.map(file => File.create([ file.filename, file.path, req.session.userId ]));
        const files = await Promise.all(filesPromise);

        let results = await Recipe.create(values);
        const recipeId = results.rows[0].id;

        await RecipeFile.create({ files, recipeId });

        return res.redirect("/admin/recipes");
    },

    async show(req, res){
        let results = await Recipe.find(req.params.id);;
        const recipe = results.rows[0];

        if(!recipe) return res.send("Recipe not found!");

        results = await Recipe.files(req.params.id);
        const files = results.rows.map(file => ({
            ...file,
            src: `${ req.protocol }://${ req.headers.host }${ file.path.replace("public", "") }`
        }));
        
        if(req._parsedOriginalUrl.path == `/recipes`)
            return res.render("site/recipe", { recipe, files });

        return res.render("admin/recipes/recipe", { recipe, files });
    },

    async edit(req, res){
        let results = await Recipe.find(req.params.id);
        const recipe = results.rows[0];

        if(!recipe) return res.send("Recipe not found!");

        results = await Recipe.chefSelectOptions();
        const options = results.rows;

        results = await Recipe.files(recipe.id);
        let files = results.rows;

        files = files.map(file => ({
            ...file,
            src: `${ req.protocol }://${ req.headers.host }${ file.path.replace("public", "") }`
        }));

        return res.render('admin/recipes/edit', { recipe, chefOptions: options, files,  filesLength: files.length});
    },

    async put(req, res){
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "" && key != "removed_files") {
                return res.send('Please, fill all fields"');
            }      
        }

        if(req.body.chef_id == 0) {
            return res.send("Plese, select a chef!");
        }

        if(req.files.length != 0) {
            const newFilesPromise = req.files.map(file => 
                File.create([ file.filename, file.path, req.session.userId ]));

            const files = await Promise.all(newFilesPromise);
            const recipeId = req.body.id;

            await RecipeFile.create({ files, recipeId });
        }

        if(req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(",");
            const lastIndex = removedFiles.length - 1;
            removedFiles.splice(lastIndex, 1);

            const removedRecipeFilePromise = removedFiles.map(id => RecipeFile.deleteFile(id));
            await Promise.all(removedRecipeFilePromise);

            const removedFilesPromise = removedFiles.map(id => File.delete(id));
            await Promise.all(removedFilesPromise);
        }

        const values = [
            req.body.chef_id,
            req.body.title,
            req.body.ingredients,
            req.body.preparation,
            req.body.informations,
            req.body.id
        ];

        await Recipe.update(values);

        return res.redirect(`/admin/recipes/${ req.body.id }`);
    },

    async delete(req, res){
        const result = await RecipeFile.getIdFiles(req.body.id);
        const files = result.rows;
         
        await RecipeFile.deleteRecipe(req.body.id);

        const removedFilesPromise = files.map(file => File.delete(file.file_id));
        await Promise.all(removedFilesPromise);
        
        await Recipe.delete(req.body.id);

        return res.redirect("/admin/recipes");
    }
}