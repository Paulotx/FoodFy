
const Recipe = require("../model/Recipe");
const Files  = require("../model/File");

module.exports = {

    async home(req, res) {

        const results = await Recipe.all();
        let recipes = results.rows;

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

        return res.render("user/index", { recipes });
    }
}