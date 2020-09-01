/*
* JAVASCRIPT HELPERS
*/

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const form = document.getElementById('form');
    const name = document.getElementById('name');
    const email = document.getElementById('email');


    const isValidate = false;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        for (let elem of form.elements) {
            if (elem.classList.contains('success').length > 1) {
                alert('yes');
            }
        }
        checkInputs();

    });

    function checkInputs() {

        let nameValue = name.value.trim();
        let emailValue = email.value.trim();
        
        if (nameValue === '') {
            setErrorFor(name, 'Username cannot be blank');

        } else if (!isName(emailValue)) {
            setErrorFor(name, 'Not a valid name');
        } else {
            setSuccessFor(name);

        }
        if (emailValue === '') {
            setErrorFor(email, 'Email cannot be blank');

        } else if (!isEmail(emailValue)) {
            setErrorFor(email, 'Not a valid email');

        } else {
            setSuccessFor(email);

        }
    }



    function setErrorFor(input, message) {
        const inputBox = input.parentElement;
        const errorMessage = inputBox.querySelector('.errors');
        inputBox.className = 'form__field error';
        errorMessage.textContent = message;

    }

    function setSuccessFor(input) {
        const inputBox = input.parentElement;
        const errorMessage = inputBox.querySelector('.errors');
        inputBox.className = 'form__field success';
        errorMessage.textContent = "";

    }


    function isName(name) {
        let regExpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-']+[a-zA-Zа-яА-Я']{3,16}?/; 
        return regExpName.test(name);
    }

    function isEmail(email) {
        let regExpEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return regExpEmail.test(email);
    }


});
// проставляем title у ссылок изображений
// инициализируем (подключаем) либу фотогалереи
(function($){
    window.lightGallery = function(block, a) {
        $(block).find(a).each(function() {
            $(this).attr('data-sub-html', $(this).find('img').attr('title'));
        });
        $(block).lightGallery({
            selector: a,
            download: false,
            fullScreen: false,
            zoom: false,
            share: false,
            thumbnail: true
        });
    }
})(jQuery);

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


