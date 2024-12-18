<?php
require_once 'db_connection.php';

class DatabaseInitializer {
    private $conn;
    private $dbName;

    public function __construct($dbName) {
        $this->dbName = $dbName;
        $this->connect();
    }

    // Conectar al servidor MySQL sin seleccionar una base de datos
    private function connect() {
        try {
            $this->conn = new PDO("mysql:host=localhost", "DBUSER2024", "DBPSWD2024");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }

    // Verificar si la base de datos ya existe
    private function databaseExists() {
        $stmt = $this->conn->prepare("SHOW DATABASES LIKE :dbName");
        $stmt->bindParam(':dbName', $this->dbName);
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }

    // Inicializar la base de datos usando un archivo SQL
    public function initialize($sqlFilePath) {
        if ($this->databaseExists()) {
            return;
        }

        // Crear la base de datos
        $this->conn->exec("CREATE DATABASE IF NOT EXISTS {$this->dbName}");

        // Seleccionar la base de datos recién creada
        $this->conn->exec("USE {$this->dbName}");

        // Leer y procesar el archivo SQL
        $sqlScript = file_get_contents($sqlFilePath);
        $queries = explode(';', $sqlScript);

        foreach ($queries as $query) {
            $trimmedQuery = trim($query);
            if (!empty($trimmedQuery)) {
                $this->conn->exec($trimmedQuery);
            }
        }
    }

    // Cerrar la conexión
    public function closeConnection() {
        $this->conn = null;
    }
}

$dbInitializer = new DatabaseInitializer("F1_Desktop");
$dbInitializer->initialize("database.sql");
$dbInitializer->closeConnection();
header("Location: pagina.php");
?>