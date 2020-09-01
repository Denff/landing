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