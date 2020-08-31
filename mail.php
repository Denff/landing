<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$to = "denffv@yandex.ru";
$subject = 'Отправлены контакты с сайта LANDING';
$headers = "From: $name <$email>" . "\r\n";

if (mail($to,$subject,$headers)) {
	echo 'Ваше сообщение успешно отправлено (ответ сервера)!';
} else {
	echo 'Возникла ошибка при обработке фукнции ьфшд на серверре (ответ сервера)!';
}