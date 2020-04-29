const db = require("../../config/db");

module.exports = {
    create({ files, recipeId }) {
        try {
            files.forEach(file => {
                const query = `
                    INSERT INTO recipe_files (
                        recipe_id,
                        file_id
                    ) VALUES ($1, $2)
                `;
    
                db.query(query, [ recipeId, file.rows[0].id ]);
            });
            
            return;
        }
        catch(err) {
            console.error(err);
        }
    }, 

    deleteFile(id) {
        try {
            db.query(`DELETE FROM recipe_files WHERE file_id = $1`, [ id ]);

            return;
        } 
        catch(err) {
            console.error(err);
        }
        
    },

    deleteRecipe(id) {
        try {
            db.query(`DELETE FROM recipe_files WHERE recipe_id = $1`, [ id ]);

            return;
        } 
        catch(err) {
            console.error(err);
        }
    },

    getIdFiles(id) {
        try {
            return db.query(`SELECT file_id FROM recipe_files WHERE recipe_id = $1`, [ id ]);
        } 
        catch(err) {
            console.error(err);
        }
    }
}