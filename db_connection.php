<?php

class DBConnection {
    private $server = 'localhost';  // Servidor de la base de datos
    private $user = 'DBUSER2024';   // Usuario de la base de datos
    private $pass = 'DBPSWD2024';   // Contraseña de la base de datos
    private $db = 'F1_Desktop';     // Nombre de la base de datos
    private $conn;

    public function __construct() {
        try {
            // Conectar al servidor MySQL sin especificar una base de datos
            $this->conn = new PDO("mysql:host={$this->server}", $this->user, $this->pass);
            
            // Establecer el modo de error de PDO a excepción
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Crear la base de datos si no existe
            $sql = "CREATE DATABASE IF NOT EXISTS {$this->db}";
            $this->conn->exec($sql);

            // Seleccionar la base de datos F1_Desktop
            $this->conn->exec("USE {$this->db}");
        } catch (PDOException $e) {
            // Si ocurre un error, lo mostramos
            echo "Error de conexión: " . $e->getMessage();
        }
    }

    // Obtener la conexión para usarla en otros lugares
    public function getConnection() {
        return $this->conn;
    }

    // Cerrar la conexión
    public function closeConnection() {
        $this->conn = null;
    }
}
?>