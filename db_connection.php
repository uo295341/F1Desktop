<?php

class DBConnection {
    private $server = 'localhost';  // Servidor de la base de datos
    private $user = 'DBUSER2024';   // Usuario de la base de datos
    private $pass = 'DBPSWD2024';   // Contraseña de la base de datos
    private $db = 'F1_Desktop';     // Nombre de la base de datos
    private $conn;

    public function __construct() {
        // Conectar al servidor MySQL sin especificar una base de datos
        $this->conn = new mysqli($this->server, $this->user, $this->pass);

        // Verificar si la conexión es exitosa
        if ($this->conn->connect_error) {
            die("Conexión fallida: " . $this->conn->connect_error);
        }

        // Crear la base de datos si no existe
        $sql = "CREATE DATABASE IF NOT EXISTS $this->db";
        if ($this->conn->query($sql) === TRUE) {
            
        } else {
            echo "Error al crear la base de datos: " . $this->conn->error . "<br>";
        }

        // Seleccionar la base de datos F1_Desktop
        $this->conn->select_db($this->db);
    }

    // Obtener la conexión para usarla en otros lugares
    public function getConnection() {
        return $this->conn;
    }

    // Cerrar la conexión
    public function closeConnection() {
        $this->conn->close();
    }
}
?>
