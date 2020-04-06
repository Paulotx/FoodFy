const recipes_admin = document.querySelectorAll('.recipe-admin a');

for(let i = 0; i < recipes_admin.length; i++) {
    recipes_admin[i].addEventListener('click', function() {
        const recipeID = i;
        window.location.href = `/admin/recipes/${ recipeID }`;
    });
}

const recipes = document.querySelectorAll('.recipe');

for(let i = 0; i < recipes.length; i++) {
    recipes[i].addEventListener('click', function() {
        const recipeID = i;
        window.location.href = `/recipes/${ recipeID }`;
    });
}