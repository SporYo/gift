<?php
$_POST = json_decode(file_get_contents("php://input"), true);
$user_email  = $_POST["user_email"];
$user_gift = $_POST["user_gift"];
echo $user_email;
mail('sporeyo89@gmail.com', $user_email, $user_gift );
?>