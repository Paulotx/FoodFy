const ingredients      = document.querySelector('.ingredients ul');
const click_ingredient = document.querySelector('.ingredients .hide-show');

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

const preparation       = document.querySelector('.preparation p');
const click_preparation = document.querySelector('.preparation .hide-show');

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

const information       = document.querySelector('.information p');
const click_information = document.querySelector('.information .hide-show');

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