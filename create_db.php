<?php
require_once 'db_connection.php';

class DatabaseInitializer {
    private $conn;
    private $dbName;

    public function __construct($dbName) {
        $this->dbName = $dbName;
        $this->connect();
    }

    // Connect to MySQL server without selecting a database
    private function connect() {
        $this->conn = new mysqli("localhost", "DBUSER2024", "DBPSWD2024");
        
    }

    // Check if the database already exists
    private function databaseExists() {
        $result = $this->conn->query("SHOW DATABASES LIKE '{$this->dbName}'");
        return $result && $result->num_rows > 0;
    }

    // Initialize the database using a SQL file
    public function initialize($sqlFilePath) {
        if ($this->databaseExists()) {
            return;
        }

        // Read and process the SQL file
        $sqlScript = file_get_contents($sqlFilePath);

            $queries = explode(';', $sqlScript);
            foreach ($queries as $query) {
                $trimmedQuery = trim($query);
                if (!empty($trimmedQuery)) {
                    $this->conn->query($trimmedQuery);
                }
            }
    }

    // Close the connection
    public function closeConnection() {
        $this->conn->close();
    }
}


$dbInitializer = new DatabaseInitializer("F1_Desktop");
$dbInitializer->initialize("database.sql");
$dbInitializer->closeConnection();
header("Location: pagina.php");
?>
