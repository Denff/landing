const form = document.querySelector('.form__contact');
const name = document.querySelector('input[name=name]');
const email = document.querySelector('input[name=email]');
const btnSubmit = document.querySelector('.btn-submit')

function checkInputs() {

    let nameValue = name.value.trim();
    let emailValue = email.value.trim();

    if (nameValue === '') {
        setErrorFor(name, 'Name cannot be blank');

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

function serialize(form) {
    if (!form || form.nodeName !== "FORM") {
        return false;
    }
    let i, j, q = [];
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === "") {
            continue;
        }
        switch (form.elements[i].nodeName) {
            case 'INPUT':
                switch (form.elements[i].type) {
                    case 'text':
                    case 'tel':
                    case 'email':
                    case 'hidden':
                    case 'password':
                    case 'button':
                    case 'reset':
                    case 'submit':
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        break;
                    case 'checkbox':
                    case 'radio':
                        if (form.elements[i].checked) {
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        }
                        break;
                }
                break;
            case 'file':
                break;
            case 'TEXTAREA':
                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                break;
            case 'SELECT':
                switch (form.elements[i].type) {
                    case 'select-one':
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        break;
                    case 'select-multiple':
                        for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                            if (form.elements[i].options[j].selected) {
                                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
                            }
                        }
                        break;
                }
                break;
            case 'BUTTON':
                switch (form.elements[i].type) {
                    case 'reset':
                    case 'submit':
                    case 'button':
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        break;
                }
                break;
        }
    }
    return q.join("&");
}

btnSubmit.addEventListener('click', event => {
    event.preventDefault();
    checkInputs();
    console.log(serialize(form));
});

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


