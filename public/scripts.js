const recipes_admin = document.querySelectorAll('.recipe-admin a');

for(let i = 0; i < recipes_admin.length; i++) {
    recipes_admin[i].addEventListener('click', function() {
        const recipeID = i;
        window.location.href = `/admin/recipes/${ recipeID }`;
    });
}

// const recipes = document.querySelectorAll('.recipe');

// for(let i = 0; i < recipes.length; i++) {
//     recipes[i].addEventListener('click', function() {
//         const recipeID = i;
//         window.location.href = `/recipes/${ recipeID }`;
//     });
// }

/* Show-Hide */
const ingredients      = document.querySelector('.ingredients ul');
const click_ingredient = document.querySelector('.ingredients .hide-show');

if(click_ingredient) {
    click_ingredient.addEventListener('click', function() {
        const action = document.querySelector('.ingredients .title .hide-show').innerHTML;
    
        if(action == "MOSTRAR") {
            ingredients.classList.add('active');
            document.querySelector('.ingredients .title .hide-show').innerHTML = "ESCONDER";
        }
        else {
            ingredients.classList.remove('active');
            document.querySelector('.ingredients .title .hide-show').innerHTML = "MOSTRAR";
        }
    });
}

const preparation       = document.querySelector('.preparation p');
const click_preparation = document.querySelector('.preparation .hide-show');

if(click_preparation) {
    click_preparation.addEventListener('click', function() {
        const action = document.querySelector('.preparation .title .hide-show').innerHTML;
    
        if(action == "MOSTRAR") {
            preparation.classList.add('active');
            document.querySelector('.preparation .title .hide-show').innerHTML = "ESCONDER";
        }
        else {
            preparation.classList.remove('active');
            document.querySelector('.preparation .title .hide-show').innerHTML = "MOSTRAR";
        }
    });
}

const information       = document.querySelector('.information p');
const click_information = document.querySelector('.information .hide-show');

if(click_information) {
    click_information.addEventListener('click', function() {
        const action = document.querySelector('.information .title .hide-show').innerHTML;
    
        if(action == "MOSTRAR") {
            information.classList.add('active');
            document.querySelector('.information .title .hide-show').innerHTML = "ESCONDER";
        }
        else {
            information.classList.remove('active');
            document.querySelector('.information .title .hide-show').innerHTML = "MOSTRAR";
        }
    });
}

/* ADD-FIEDLS */
const add_ingredient = document.querySelector(".item .add-ingredient");

if(add_ingredient) add_ingredient.addEventListener("click", addIngredient);

function addIngredient() {
    const ingredients    = document. querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");
    const newField       = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;

    //Deixa o valor do input vazio
    newField.children[0].value = "";
    ingredients.appendChild(newField);
}

const add_preparation = document.querySelector(".item .add-preparation");

if(add_preparation) add_preparation.addEventListener("click", addPreparation);

function addPreparation() {
    const preparation    = document.querySelector("#preparation");
    const fieldContainer = document.querySelectorAll(".stage");
    const newField       = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;

    //Deixa o valor do input vazio
    newField.children[0].value = "";
    preparation.appendChild(newField);
}

const remove_ingredient = document.querySelector(".item .remove-ingredient");

if(remove_ingredient) remove_ingredient.addEventListener("click", removeIngredient);

function removeIngredient() {
    const ingredients = document.querySelectorAll(".ingredient");

    if(ingredients.length - 1 == 0) return false;

    ingredients[ingredients.length - 1].remove();
}

const remove_preparation = document.querySelector(".item .remove-preparation");

if(remove_preparation) remove_preparation.addEventListener("click", removePreparation);

function removePreparation() {
    const preparation = document.querySelectorAll(".stage");

    if(preparation.length - 1 == 0) return false;

    preparation[preparation.length - 1].remove();
}  


// Confirmação de Exclusão
function confirmDelete(formDelete) {
    formDelete.addEventListener("submit", function(event) {
        const confirmation = confirm("Deseja Deletar?");

        if(!confirmation) {
            event.preventDefault();
        }
    });
}

const formDelete = document.querySelector("#form-delete");

if(formDelete) {
    confirmDelete(formDelete);
}

function paginate(SelectedPage, totalPages) {
    let pages = [], oldPage;

    for(let currentPage = 1; currentPage <= totalPages; currentPage++) {
        
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
        const pagesAfterSelectedPage = currentPage <= SelectedPage + 2;
        const pagesBeforeSelectePage = currentPage >= SelectedPage - 2;

        if(firstAndLastPage || pagesBeforeSelectePage && pagesAfterSelectedPage) {
            if(oldPage && currentPage - oldPage > 2) {
                pages.push("...");
            }

            if(oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1);
            }

            pages.push(currentPage);

            oldPage = currentPage;
        }
    }

    return pages;
}
const pagination = document.querySelector(".pagination");

if (pagination) {
    
    const page   = +pagination.dataset.page;
    const total  = +pagination.dataset.total;
    const filter = pagination.dataset.filter;
    const pages  = paginate(page, total);

    let elements = "";

    for(let page of pages) {
        if(String(page).includes("...")){
            elements += `<span>${ page }</span>`;
        }
        else {
            if(filter) {
                elements += `<a href="?page=${ page }&filter=${ filter }">${ page }</a>`;
            }
            else {
                elements += `<a href="?page=${ page }">${ page }</a>`;
            }        
        }
    }

    pagination.innerHTML = elements;
}

