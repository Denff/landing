const btns = document.querySelectorAll('.btn');
const overlay = document.querySelector('.overlay');
const modal = document.querySelectorAll('.modal');
const modalClose = document.querySelector('.modal__close');

btns.forEach((el) => {
    el.addEventListener('click', (e) => {
        let path = e.currentTarget.getAttribute('data-path');
        console.log(path);

        modal.forEach((e) => {
            e.classList.remove('modal-opened');
        });
        document.querySelector(`[data-target="${path}"]`).classList.add('modal-opened');
        overlay.classList.add('overlay-visible');
    });
});

overlay.addEventListener('click', (e) => {

    if (e.target == overlay) {
        modal.forEach((e) => {
            e.classList.remove('modal-opened');
        });
        overlay.classList.remove('overlay-visible');
    }
});
modalClose.addEventListener('click', (e) => {
    // let modalClass = e.currentTarget.getAttribute('data-modalClass');
    // document.querySelector(modalClass).classList.remove('modal-opened');
    modal.forEach((e) => {
        e.classList.remove('modal-opened');
    });
    overlay.classList.remove('overlay-visible');

});