const db = require("../../config/db");

const fs = require("fs");
const Recipe = require("../model/Recipe");

module.exports = {
    all() {
        return db.query("SELECT * FROM users");
    },

    async findOne(filters) {
        let query = "SELECT * FROM users";

        try {
            Object.keys(filters).map(key => {
                query = `${ query }
                    ${ key }
                `;
    
                Object.keys(filters[key]).map(field => {
                    query = `${ query } ${ field } = '${ filters[key][field] }'`;
                });
            });
    
            const results = await db.query(query);
            return results.rows[0];
        }
        catch(err) {
            console.error(err);
        }
    },

    async create(values) {
        try {
            const query = `
                INSERT INTO users(
                    name,
                    email,
                    password,
                    is_admin
                ) VALUES ($1, $2, $3, $4)
                RETURNING id
            `;

            return db.query(query, values);
        } catch (err) {
            console.error(err);
        }
    },

    async update(id, fields) {
        let query = "UPDATE users SET";

        Object.keys(fields).map((key, index, array) => {
            if((index + 1) < array.length) {
                query = `${ query }
                    ${ key } = '${ fields[key] }',
                `
            } 
            else {
                query = `${ query }
                    ${ key } = '${ fields[key] }'
                    WHERE id = ${ id }
                `
            }
        });

        await db.query(query);
        return;
    },

    async delete(id) {
        let results = await db.query("SELECT * FROM recipes WHERE user_id = $1", [ id ]);
        const recipes = results.rows;

        const allFilesPromise = recipes.map(recipe => Recipe.files(recipe.id));

        let promiseResults = await Promise.all(allFilesPromise);

        await db.query("DELETE FROM users WHERE id = $1", [ id ]);

        promiseResults.map(results => {
            try{
                results.rows.map(file => fs.unlinkSync(file.path));
            }
            catch(err){
                console.error(err);
            } 
        });
    }
}