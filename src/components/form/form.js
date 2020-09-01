document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const contactForm = document.querySelector('.form__contact');

    let isValidate = false;
  
    const regExpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']{3,16}?$/;
    const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    // const regExpMessage = /^[a-z0-9_-]{10,255}$/;


    const submit = () => {

        let contactFormData = {
            name: document.querySelector('input[name="name"]').value,
            email: document.querySelector('input[name="email"]').value,
            message: document.querySelector('textarea[name="message"]').value
        };

        const request = new XMLHttpRequest();

        // request.addEventListener('load', () => {
        // });

        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                console.log(request.responseText);
                alert('отправлено!!!');
            }
        });

        request.open('POST', '/mail.php', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send('name=' + encodeURIComponent(contactFormData.name)
            + '&email=' + encodeURIComponent(contactFormData.email)
            + '&message=' + encodeURIComponent(contactFormData.message));

        for ( let elem of contactFrom.elements){
            if(elem.tagName === 'INPUT'){
                elem.value = "";
            }
        }
    }

    const validateElem = (elem) => {

        let errorDiv = elem.nextElementSibling;
        let errText = "Некорректный ввод символов!"

        if (elem.name == 'name') {
            if (!regExpName.test(elem.value) && elem.value !== '') {
                errorDiv.textContent = errText;
                isValidate = false;
            } else {
                errorDiv.textContent = "";
                isValidate = true;
            }
        }
        if (elem.name == 'email') {
            if (!regExpEmail.test(elem.value) && elem.value !== '') {
                errorDiv.textContent = errText;
                isValidate = false;
            } else {
                errorDiv.textContent = "";
                isValidate = true;
            }
        }
        // if (elem.name == 'message') {
        //     if (!regExpMessage.test(elem.value) && elem.value !== '') {
        //         errorDiv.textContent = errText;
        //         isValidate = false;
        //     } else {
        //         errorDiv.textContent = "";
        //         isValidate = true;
        //     }
        // }
    };

    for (let elem of contactForm.elements) {
        if (elem.tagName === 'INPUT') {
            elem.addEventListener('mouseout', () => {
                validateElem(elem);
            });
        }
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        for (let elem of contactForm.elements) {

            if (elem.tagName === 'INPUT') {
                if (elem.value == "") {
                    elem.nextElementSibling.textContent = "Данное поле не заполнено!";
                    isValidate = false;
                } else {
                    elem.nextElementSibling.textContent = "";
                    isValidate = true;
                }
            }
        }
        if (isValidate) submit();
    });
});
