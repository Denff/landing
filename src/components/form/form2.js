"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);
        let formData = new FormData(form);

        console.log('error: '  + error);
        if (error === 0){
            console.log('435345');
            form.classList.add('sending');
            
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok){
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('sending');
            } else {
                alert('Ошибка');
                form.classList.remove('sending');
            }
        } else {
            alert('Заполните обязательные поля');
        }
    }

    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('.required-field');

        for (let i = 0; i < formReq.length; i++){
            const input = formReq[i];
            formRemoveError(input);

            if(input.classList.contains('email')) {
               if (emailTest(input)){
                   formAddError(input);
                   error++;
               }

            } 
            else if(input.getAttribute('type') === 'checkbox' && input.checked === false){
               formAddError(input);
               error++;
            } 
            else {
                if (input.value === ''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input){
        //input.parentElement.classList.add('error');
        input.classList.add('error');
    }
    function formRemoveError(input){
        //input.parentElement.classList.remove('error');
        input.classList.remove('error');
    }

    //function nameTest(input){
    //     let regExpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-']+[a-zA-Zа-яА-Я']{3,16}?/;
    //     return regExpName.test(input.value);
    //}

    function emailTest(input){
        let regExpEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return regExpEmail.test(input.value);
    }

});
