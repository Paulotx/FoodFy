// const modalOverlay = document.querySelector('.modal-overlay');
// const videos       = document.querySelectorAll('.video');

// for (let video of videos) {
//     video.addEventListener('click', function() {
//         const videoSrc = video.querySelector('img').getAttribute('src');
//         const h3       = video.querySelector('h3').innerHTML;
//         const p        = video.querySelector('p').innerHTML;

//         modalOverlay.classList.add('active');
//         modalOverlay.querySelector('.modal-content img').src      = videoSrc;
//         modalOverlay.querySelector('.modal-content h3').innerHTML = h3;
//         modalOverlay.querySelector('.modal-content p').innerHTML  = p;
//     })
// }

// document.querySelector('.close-modal').addEventListener('click', function() {
//     modalOverlay.classList.remove('active');
// });



const modalOverlay = document.querySelector('.modal-overlay');
const recipes     = document.querySelectorAll('.recipe');

for(let i = 0; i < recipes.length; i++) {
    recipes[i].addEventListener('click', function() {
        const recipeID = i;
        window.location.href = `/recipes/${ recipeID }`;
    });
}

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