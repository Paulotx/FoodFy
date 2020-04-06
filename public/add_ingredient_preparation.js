document
    .querySelector(".item .add-ingredient")
    .addEventListener("click", addIngredient);

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

document
    .querySelector(".item .add-preparation")
    .addEventListener("click", addPreparation);

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

document
    .querySelector(".item .remove-ingredient")
    .addEventListener("click", removeIngredient);

function removeIngredient() {
    const ingredients = document.querySelectorAll(".ingredient");

    if(ingredients.length - 1 == 0) return false;

    ingredients[ingredients.length - 1].remove();
}

document
    .querySelector(".item .remove-preparation")
    .addEventListener("click", removePreparation);

function removePreparation() {
    const preparation = document.querySelectorAll(".stage");

    if(preparation.length - 1 == 0) return false;

    preparation[preparation.length - 1].remove();
}
    