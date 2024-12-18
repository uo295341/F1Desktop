<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'db_connection.php';

class CSVImporter {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function importCSV($table, $filePath) {
        // Tables allowed for import
        $allowedTables = ['Equipos', 'Pilotos', 'Carreras', 'Resultados', 'Temporada'];
        
        // Check if the table is in the allowed list
        if (!in_array($table, $allowedTables)) {
            echo "Table $table is not allowed for import.";
            return;
        }

        // Read the CSV file
        if (($handle = fopen($filePath, "r")) !== FALSE) {
            // Read the first row for column names
            $columns = fgetcsv($handle, 1000, ","); 

            // Build the SQL query dynamically
            $columnString = implode(", ", $columns);
            $placeholders = implode(", ", array_fill(0, count($columns), "?"));
            $query = "INSERT INTO $table ($columnString) VALUES ($placeholders)";
            
            // Prepare the statement
            $stmt = $this->conn->prepare($query);

            // Insert each row into the database
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                // Bind the parameters dynamically for each row
                foreach ($data as $index => $value) {
                    $stmt->bindValue($index + 1, $value, PDO::PARAM_STR); // Bind each value to its respective placeholder
                }
                $stmt->execute();
            }

            fclose($handle);
        } else {
            echo "Failed to open the file.";
        }
    }
}
?>

<!DOCTYPE HTML>
<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <meta name="author" content="Ignacio Hovan Rojas" />
    <meta name="description" content="Importar datos desde un archivo CSV" />
    <meta name="keywords" content="F1, CSV, importar datos" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico" />
    <title>Importar Datos CSV</title>
</head>

<body>
    <header>
        <h1><a href="index.html" title="Inicio">F1 Desktop</a></h1>
        <nav>
            <a href="index.html" title="Inicio">Inicio</a>
            <a href="piloto.html" title="Piloto">Piloto</a>
            <a href="noticias.html" title="Noticias">Noticias</a>
            <a href="calendario.html" title="Calendario">Calendario</a>
            <a href="metereología.html" title="Meteorología">Meteorología</a>
            <a href="circuito.html" title="Circuito">Circuito</a>
            <a href="viajes.php" title="Viajes">Viajes</a>
            <a href="juegos.html" title="Juegos" class="active">Juegos</a>
        </nav>
    </header>

    <p>
        Estás en: <a href="index.html" title="Inicio">Inicio</a> | <a href="juegos.html" title="Juegos">Juegos</a> |
         <a href="pagina.php" title="Pagina">Pagina</a> | Importar Datos CSV
    </p>

    <main>
        <h2>Importar Datos desde un Archivo CSV</h2>
        <form action="import_csv.php" method="POST" enctype="multipart/form-data">
            <label for="table">Selecciona una Tabla:</label>
            <select name="table" id="table" required>
                <option value="">Escoge una tabla</option>
                <option>Equipos</option>
                <option>Pilotos</option>
                <option>Carreras</option>
                <option>Resultados</option>
                <option>Temporada</option>
            </select>

            <label for="csv_file">Selecciona un Archivo CSV:</label>
            <input type="file" name="csv_file" id="csv_file" accept=".csv" required />

            <button type="submit">Importar</button>
        </form>
    </main>
</body>
</html>
