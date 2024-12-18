<?php

// Assuming your DBConnection class is in the same file or included at the top
require_once 'db_connection.php'; // Adjust path as needed

class ExportToCSV {
    private $dbConnection;

    public function __construct(DBConnection $dbConnection) {
        $this->dbConnection = $dbConnection;
    }

    // Function to export all tables into a single CSV file
    public function exportAllTablesToCSV() {
        // List of tables you want to export
        $tables = ['Equipos', 'Pilotos', 'Carreras', 'Resultados', 'Temporada'];

        // Set headers for the final CSV file download
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="all_tables_data.csv"');
        header('Pragma: no-cache');
        header('Expires: 0');

        // Open output stream to php://output to send CSV directly to the browser
        $output = fopen('php://output', 'w');

        // Loop through each table and write its data to the same CSV file
        foreach ($tables as $table) {
            // Write a header for each table in the CSV file
            fputcsv($output, ["--- Table: $table ---"]);

            // Get the data for this table
            $this->writeTableDataToCSV($table, $output);

            // Add a line break after each table's data
            fputcsv($output, []);
        }

        // Close the output stream
        fclose($output);
    }

    // Function to write data from a single table to the CSV file
    private function writeTableDataToCSV($tableName, $output) {
        $conn = $this->dbConnection->getConnection();
        $query = "SELECT * FROM $tableName";
        $result = $conn->query($query);

        if (!$result) {
            echo "Error querying table: $tableName<br>" . $conn->error;
            return;
        }

        // Write column names as the header for this table
        $columns = $result->fetch_fields();
        $columnNames = [];
        foreach ($columns as $column) {
            $columnNames[] = $column->name;
        }
        fputcsv($output, $columnNames);

        // Write each row from the database to the CSV file
        while ($row = $result->fetch_assoc()) {
            fputcsv($output, $row);
        }
    }
}

// Create an instance of DBConnection to connect to the database
$dbConnection = new DBConnection();

// Create an instance of ExportToCSV, passing the DBConnection object
$exporter = new ExportToCSV($dbConnection);

// Export all tables to a single CSV file
$exporter->exportAllTablesToCSV();

?>