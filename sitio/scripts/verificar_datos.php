<?php
// Incluimos la conexión para que esté disponible en este script
include 'conexion.php';

// Aquí recibirías los datos enviados por POST desde el formulario:
$usuario = $_POST['usuario'];
$contraseña = $_POST['contraseña'];

// Resto de tu lógica para verificar en la base de datos...
?>