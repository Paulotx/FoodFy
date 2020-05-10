const recipes_admin = document.querySelectorAll('.recipe-admin a');

for(let i = 0; i < recipes_admin.length; i++) {
    recipes_admin[i].addEventListener('click', function() {
        const recipeID = i;
        window.location.href = `/admin/recipes/${ recipeID }`;
    });
}

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

function getNumberOlds() {
    return document.querySelector('input[name="files_lenth"]').value;
}

const PhotosUpload = {
    input: "",

    preview: document.querySelector("#photos-preview"),

    uploadLimit: 5,

    files: [],

    numberOlds: getNumberOlds || 0,

    handleFileInput(event) {
        const { files: fileList } = event.target;

        PhotosUpload.input = event.target;

        if(PhotosUpload.hasLimit(event)) return;

        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file);

            const reader = new FileReader();

            reader.onload = () => {
                const image = new Image();
                image.src = String(reader.result);

                const div = PhotosUpload.getContainer(image);

                PhotosUpload.preview.appendChild(div);
            }

            reader.readAsDataURL(file);
        });

        PhotosUpload.input.files = PhotosUpload.getAllFiles();
    },

    hasLimit(event) {
        const { uploadLimit, input, preview } = PhotosUpload;
        const { files: fileList } = input;

        if(fileList.length > uploadLimit) {
            alert(`Envie no máximo ${ uploadLimit } fotos!`);
            event.preventDefault();
            return true;
        }

        const photosDiv = [];
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "photo") {
                photosDiv.push(item);
            }
        });

        const totalPhotos = fileList.length + photosDiv.length;

        if(totalPhotos > uploadLimit) {
            alert("Você atingiu o limite máximo de fotos!");
            event.preventDefault();
            return true;
        }

        return false;
    },

    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file));

        return dataTransfer.files;
    },

    getContainer(image) {
        const div = document.createElement("div");
        div.classList.add("photo");
        div.onclick = PhotosUpload.removePhoto;
        div.appendChild(image);
        div.appendChild(PhotosUpload.getRemoveButton());

        return div;
    },

    getRemoveButton() {
        const button = document.createElement("i");
        button.classList.add("material-icons");
        button.innerHTML = "close";
        return button;
    },

    removePhoto(event) {
        const photoDiv    = event.target.parentNode;
        const photosArray = Array.from(PhotosUpload.preview.children);
        const index       = photosArray.indexOf(photoDiv);

        PhotosUpload.files.splice((index - PhotosUpload.numberOlds), 1);
        PhotosUpload.input.files = PhotosUpload.getAllFiles();

        photoDiv.remove();
    },

    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode;

        if(photoDiv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"]');
            if(removedFiles) {
                removedFiles.value += `${ photoDiv.id },`;
            }
        }
        photoDiv.remove();
        PhotosUpload.numberOlds--;
    }
}

const ImageGallery = {
    highlight: document.querySelector(".recipe-viewed .highlight > img"),

    previews: document.querySelectorAll(".gallery-preview .container-img-file img"),

    setImage(event) {
        const { target } = event;

        ImageGallery.previews.forEach(preview => preview.classList.remove("active"));
        target.classList.add("active");

        ImageGallery.highlight.src = target.src;
        Lightbox.image.src = target.src;
    }
}

const Lightbox = {
    target: document.querySelector(".lightbox-target"),

    image: document.querySelector(".lightbox-target img"),

    closeButton: document.querySelector(".lightbox-target a.lightbox-close"),

    open() {
        Lightbox.target.style.opacity = 1;
        Lightbox.target.style.top = 0;
        Lightbox.target.style.bottom = 0;
        Lightbox.closeButton.style.top = 0;
    },

    close() {
        Lightbox.target.style.opacity = 0;
        Lightbox.target.style.top = "-100%"
        Lightbox.target.style.bottom = "initial";
        Lightbox.closeButton.style.top = "-80px";
    }
}

const Validate = {
    apply(input, func) {
        Validate.clearErrors(input);

        let results = Validate[func](input.value);
        input.value = results.value;

        if(results.error)
            Validate.displayError(input, results.error);
    },

    displayError(input, error) {
        const div = document.createElement("div");
        div.classList.add("error");
        div.innerHTML = error;

        input.parentNode.appendChild(div);
        input.focus();
    },

    clearErrors(input) {
        const errorDiv = input.parentNode.querySelector(".error");

        if(errorDiv)
            errorDiv.remove();
    },

    isEmail(value) {
        let error = null;
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(!value.match(mailFormat)) 
            error = "Email inválido!";

        return {
            error,
            value
        }
    }
}

const ValidateLogin = {
    apply(input, func) {
        ValidateLogin.clearErrors(input);

        let results = ValidateLogin[func](input.value);
        input.value = results.value;

        if(results.error)
            ValidateLogin.displayError(input, results.error);
    },

    displayError(input,) {
        input.classList.add("error-login-input");

        input.focus();
    },

    clearErrors(input) {
        input.classList.remove("error-login-input");
    },

    isEmail(value) {
        let error = null;
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(!value.match(mailFormat)) 
            error = "Email inválido!";

        return {
            error,
            value
        }
    }
}