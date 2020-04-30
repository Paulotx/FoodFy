const db = require("../../config/db");

module.exports = {

    all() {
        try {
            return db.query(`SELECT * FROM chefs ORDER BY id ASC`);
        }
        catch(err) {
            console.error(err)
        }
    },

    create(values) {
        try {
            const query = `
                INSERT INTO chefs(
                    name,
                    file_id,
                    created_at
                ) VALUES ($1, $2, $3)
                RETURNING id
            `;

            return db.query(query, values);
        }
        catch(err) {
            console.error(err);
        }        
    },

    find(id) {
        try {
            return db.query(`
                SELECT chefs.*, count(recipes) AS total_recipes
                FROM chefs 
                LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
                WHERE chefs.id = $1
                GROUP BY chefs.id
            `, 
                [ id ]
            );
        }
        catch(err) {
            console.error(err);
        }        
    },

    update(values) {
        try {
            const query = `
                UPDATE chefs SET
                    name = $1,
                    file_id = $2
                WHERE id = $3
            `;

            return db.query(query, values);
        }
        catch(err) {
            console.error(err);
        }                
    },

    delete(id) {
        try {
            return db.query(`DELETE FROM chefs WHERE id = $1`, [ id ]);
        } 
        catch (err) {
            console.error(err)
        }        
    },

    chefRecipes(id) {
        try {
            return db.query(`SELECT * FROM recipes WHERE chef_id = $1 ORDER BY created_at DESC`, [ id ]);
        }
        catch(err) {
            console.error(err);
        }        
    },

    filesRecipe(id) {
        try {
            return db.query(
                `SELECT files.*
                    FROM files
                    LEFT JOIN recipe_files ON (recipe_files.file_id = files.id)
                    LEFT JOIN recipes ON (recipes.id = recipe_files.id)
                    WHERE recipe_files.recipe_id = $1
                    ORDER BY id
                    LIMIT 1
                `, [ id ]
            );
        }
        catch(err) {
            console.error(err);
        }        
    },

    chefFile(id) {
        try {
            return db.query(`SELECT name, path FROM files WHERE id = $1`, [ id ]);
        }
        catch(err) {
            console.error(err);
        }        
    },

    files(id) {
        try {
            return db.query(`SELECT * FROM files WHERE id = $1`, [ id ]);
        }
        catch(err) {
            console.error(err);
        }                
    },

    numberOfChefRecipes(id) {
        try {
            return db.query(`SELECT count(*) FROM recipes WHERE chef_id = $1`, [ id ]);
        }
        catch(err) {
            console.error(err);
        }
    }
}



