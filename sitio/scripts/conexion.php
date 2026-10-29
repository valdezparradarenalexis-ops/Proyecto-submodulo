<?php
$servidor = "localhost";
$usuario = "tu_usuario";
$password = "tu_contraseña";
$base_de_datos = "tu_base_de_datos";

$mensaje = "";
$tipo_alerta = "";

try {
    // Intentar la conexión con PDO
    $conexion = new PDO("mysql:host=$servidor;dbname=$base_de_datos;charset=utf8mb4", $usuario, $password);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Si todo sale bien
    $mensaje = "¡Conexión exitosa a la base de datos!";
    $tipo_alerta = "exito"; // Clase CSS para éxito
    
} catch (PDOException $e) {
    // Si ocurre un error
    $mensaje = "Error de conexión: " . $e->getMessage();
    $tipo_alerta = "error"; // Clase CSS para error
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estado de Conexión PHP</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7f6;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        /* Estilo base para el indicador visual */
        .estado-conexion {
            padding: 20px 30px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            max-width: 450px;
            text-align: center;
        }
        /* Estilo visual cuando es exitoso (Verde) */
        .exito {
            background-color: #e1f5fe;
            color: #0277bd;
            border-left: 6px solid #0288d1;
        }
        /* Estilo visual cuando hay error (Rojo) */
        .error {
            background-color: #ffebee;
            color: #c62828;
            border-left: 6px solid #d32f2f;
        }
    </style>
</head>
<body>

    <!-- El elemento visual cambia dinámicamente de clase según el resultado -->
    <div class="estado-conexion <?php echo $tipo_alerta; ?>">
        <?php echo $mensaje; ?>
    </div>

</body>
</html>