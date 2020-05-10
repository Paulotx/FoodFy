const User   = require("../model/User");
const Chef   = require("../model/Chef");
const Recipe = require("../model/Recipe");

async function chefs(req, res, next) {
    const id = req.session.userId;
    const user = User.findOne({ where: { id } });

    if(user.is_admin == false) {
        const result = await Chef.all();
        let chefs = result.rows;

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

        return res.render("admin/chefs/chefs", {
            chefs: chefs,
            error: "Operção permitida somente por administradores!"
        });
    }

    next();
}

async function users(req, res, next) {
    const id = req.session.userId;
    const user = await User.findOne({ where: { id } });

    if(user.is_admin == false) {
        const result = await User.all();
        const users = result.rows;
        return res.render("admin/users/users", {
            users: users,
            error: "Operação permitida somente por administradores!"
        });
    }

    next();
}

async function recipes(req, res, next) {
    const id = req.params.id;
    let results = await Recipe.find(id);
    const recipe = results.rows[0];

    results = await Recipe.files(req.params.id);
    const files = results.rows.map(file => ({
        ...file,
        src: `${ req.protocol }://${ req.headers.host }${ file.path.replace("public", "") }`
    }));

    if(recipe.user_id != req.session.userId) {
        return res.render("admin/recipes/recipe", {
            recipe: recipe,
            files: files,
            error: "Operação permitida somente por administradores!"
        });
    }
    
    next();
}

module.exports = {
    chefs,
    users,
    recipes
}