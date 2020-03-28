const modalOverlay = document.querySelector('.modal-overlay');
const videos       = document.querySelectorAll('.video');

for (let video of videos) {
    video.addEventListener('click', function() {
        const videoSrc = video.querySelector('img').getAttribute('src');
        const h3       = video.querySelector('h3').innerHTML;
        const p        = video.querySelector('p').innerHTML;

        modalOverlay.classList.add('active');
        modalOverlay.querySelector('.modal-content img').src      = videoSrc;
        modalOverlay.querySelector('.modal-content h3').innerHTML = h3;
        modalOverlay.querySelector('.modal-content p').innerHTML  = p;
    })
}

document.querySelector('.close-modal').addEventListener('click', function() {
    modalOverlay.classList.remove('active');
})