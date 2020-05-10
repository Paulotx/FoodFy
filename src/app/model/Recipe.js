const db = require("../../config/db");

module.exports = {

    all() {
        try {
            return db.query(`
                SELECT recipes.*, chefs.name AS chef_name 
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                ORDER BY recipes.created_at DESC
                LIMIT 6
            `);
        } catch (err) {
            console.error(err);
        }
    },

    create(values) {
        try {
            const query = `
                INSERT INTO recipes(
                    chef_id,
                    title,
                    ingredients,
                    preparation,
                    information,
                    created_at,
                    user_id
                ) VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id
            `;

            return db.query(query, values);
        } catch (err) {
            console.error(err);
        }        
    },

    find(id) {
        try {
            return db.query(`
                SELECT recipes.*, chefs.name AS chef_name
                FROM recipes 
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.id = $1
                `,
                [ id ], 
            );
        } catch (err) {
            console.log(err);
        }        
    },

    update(values) {
        try {
            const query = `
                UPDATE recipes SET
                    chef_id = $1,
                    title = $2,
                    ingredients = $3,
                    preparation = $4,
                    information = $5
                WHERE id = $6
            `;

            db.query(query, values);

            return;
        } catch (err) {
            console.log(err);
        }        
    },

    delete(id) {
        try {
            return db.query(`DELETE FROM recipes WHERE id = $1`, [ id ]);
        }
        catch(err) {
            console.error(err);
        }        
    },

    chefSelectOptions() {
        try {
            return db.query(`SELECT name, id FROM chefs ORDER BY name ASC`);
        }
        catch(err) {
            console.error(err);
        }        
    },

    findBy(filter, callback) {
        db.query(`
            SELECT recipes.*, chefs.name AS chef_name 
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.title ILIKE '%${ filter }%' 
            OR chefs.name ILIKE '%${ filter }%'
            ORDER BY recipes.id ASC
        `, 
        function(err, results) {
            if(err) throw `Database Error! ${ err }`;

            callback(results.rows);
        });
    },

    paginate(params) {
        try {
            const { filter, limit, offset } = params;

            let query       = "", 
                filterQuery = "",
                totalQuery  = `(
                    SELECT count(*) FROM recipes
                ) AS total`,
                orderBy = "ORDER BY recipes.created_at DESC";

            if(filter) {
                filterQuery = `
                    WHERE recipes.title ILIKE '%${ filter }%'
                    OR chefs.name ILIKE '%${ filter }%'
                `;

                totalQuery = `(
                    SELECT count(*) FROM recipes
                    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                    ${filterQuery}
                ) as total`;

                orderBy = "ORDER BY recipes.updated_at DESC";
            }

            query = `
                SELECT recipes.*, chefs.name AS chef_name, ${ totalQuery }
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                ${ filterQuery }
                ${ orderBy }
                LIMIT $1 OFFSET $2
            `;

            return db.query(query, [limit, offset]);
        } catch (err) {
            console.error(err);
        }        
    },

    files(id) {
        try {
            return db.query(
                `SELECT files.*
                    FROM files
                    LEFT JOIN recipe_files ON (recipe_files.file_id = files.id)
                    LEFT JOIN recipes ON (recipes.id = recipe_files.id)
                    WHERE recipe_files.recipe_id = $1
                    ORDER BY id
                `, [ id ]
            );
        } 
        catch (err) {
            console.log(err);
        }
    }
}