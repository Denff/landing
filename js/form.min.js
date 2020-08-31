var contactForm = document.querySelector('.form__contact');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault;

    var contactFormData = {
        name: document.querySelector('input[name="name"]').nodeValue,
        email: document.querySelector('input[name="email"]').value,
        message: document.querySelector('textarea[name="message"]').value
    };

    var request = new XMLHttpRequest();

    request.addEventListener('load', () => {
        alert('Ваше сообщение отправлено');
        // вызов попап "Спасибо"
    });

    request.open('POST', '/mail.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send('name=' +
        encodeURIComponent(contactFormData.name) + '&message=' +
        encodeURIComponent(contactFormData.message));

});

