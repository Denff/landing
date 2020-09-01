const callModalbtn = document.querySelector('.callModal-1');
const overlay = document.querySelector('.overlay');
const modal = document.querySelectorAll('.modal');
const modalClose = document.querySelectorAll('.modal__close');

callModalbtn.addEventListener('click', (e) => {
    
    let path = e.currentTarget.getAttribute('data-path');
    console.log(path);

    modal.forEach((e) => {
        e.classList.remove('modal-opened');
    });

    let modalWindow = document.querySelector(`[data-target="${path}"]`);
    let opacity = 0.4;

    modalWindow.classList.add('modal-opened');

    let timer = setInterval(function () {
        if (opacity >= 1) {
            clearInterval(timer);
        }
        modalWindow.style.opacity = opacity;
        modalWindow.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
        opacity += opacity * 0.1;
    }, 10);

    overlay.classList.add('overlay-visible');
});


overlay.addEventListener('click', (e) => {

    if (e.target == overlay) {
        modal.forEach((e) => {
            e.classList.remove('modal-opened');
        });
        overlay.classList.remove('overlay-visible');
    }
});

modalClose.forEach((e) => {
    e.addEventListener('click', () => {

        modal.forEach((ev) => {
            ev.classList.remove('modal-opened');
        });
        overlay.classList.remove('overlay-visible');

    });
});

