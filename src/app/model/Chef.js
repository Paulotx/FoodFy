const db       = require("../../config/db");

module.exports = {

    all(callback) {
        db.query(`SELECT * FROM recipes ORDER BY id ASC`, function(err, results) {
            if(err) throw `Database Error! ${ err }`;

            callback(results.rows);
        });
    },

    create(values, callback) {
        const query = `
            INSERT INTO recipes(
                chef_id,
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `;

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${ err }`;

            callback(results.rows[0]);
        });
    },

    find(id, callback) {
        db.query(`SELECT * FROM recipes WHERE id = $1`, [ id ], function(err, results) {
            if(err) throw `Database Error! ${ err }`;

            callback(results.rows[0]);
        });
    },

    update(values, callback) {
        const query = `
            UPDATE recipes SET
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
        db.query(`DELETE FROM recipes WHERE id = $1`, [ id ], function(err, results) {
            if(err) throw `Database Error! ${ err }`;

            return callback();
        });
    }
}