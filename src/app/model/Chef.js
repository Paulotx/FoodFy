const db       = require("../../config/db");

module.exports = {

    all(callback) {
        db.query(`SELECT * FROM chefs ORDER BY id ASC`, function(err, results) {
            if(err) throw `Database Error! ${ err }`;

            callback(results.rows);
        });
    },

    create(values, callback) {
        const query = `
            INSERT INTO chefs(
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id
        `;

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${ err }`;

            callback(results.rows[0]);
        });
    },

    find(id, callback) {
        db.query(`
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs 
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            GROUP BY chefs.id
        `, 

        [ id ]

        , function(err, results) {
            if(err) throw `Database Error! ${ err }`;

            callback(results.rows[0]);
        });
    },

    update(values, callback) {
        const query = `
            UPDATE chefs SET
                chef_id = $1,
                image = $2,
                title = $3,
                ingredients = $4,
                preparation = $5,
                information = $6
            WHERE id = $7
        `;

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${ err }`;

            callback();
        });
    },

    delete(id, callback) {
        db.query(`DELETE FROM chefs WHERE id = $1`, [ id ], function(err, results) {
            if(err) throw `Database Error! ${ err }`;

            return callback();
        });
    },

    chefRecipesImage(id, callback) {
        db.query(`SELECT id, title, image FROM recipes WHERE chef_id = $1`, [ id ], function(err, results) {
            if(err) throw `Database Error! ${ err }`;

            return callback(results.rows);
        });
    }
}