<?php
require_once 'db_connection.php';

class ListResults {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function getResults($filters = []) {
        $query = "SELECT p.nombre AS piloto, c.nombre AS carrera, r.posicion, r.puntos 
                  FROM Resultados r
                  JOIN Pilotos p ON r.id_piloto = p.id_piloto
                  JOIN Carreras c ON r.id_carrera = c.id_carrera";
        
        $conditions = [];
        $params = [];
        $types = "";

        // Verificar si hay filtros activos
        if (!empty($filters['piloto'])) {
            $conditions[] = "p.nombre LIKE ?";
            $params[] = "%" . $filters['piloto'] . "%";
            $types .= "s";
        }
        if (!empty($filters['carrera'])) {
            $conditions[] = "c.nombre LIKE ?";
            $params[] = "%" . $filters['carrera'] . "%";
            $types .= "s";
        }
        if (!empty($filters['posicion'])) {
            $conditions[] = "r.posicion = ?";
            $params[] = $filters['posicion'];
            $types .= "i";
        }

        // Si hay condiciones, añadirlas a la consulta
        if (!empty($conditions)) {
            $query .= " WHERE " . implode(" AND ", $conditions);
        }

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Ejecutar la consulta si tiene parámetros
        if ($stmt) {
            if (!empty($params)) {
                // Vincular los parámetros
                $paramTypes = str_repeat('s', count($params));
                $stmt->execute($params);
            } else {
                $stmt->execute();
            }
        }

        // Obtener los resultados usando fetchAll()
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }
}

// Manejo del formulario
require_once 'db_connection.php';

$conn = (new DBConnection())->getConnection();
$listResults = new ListResults($conn);

$filters = [
    'piloto' => $_GET['piloto'] ?? '',
    'carrera' => $_GET['carrera'] ?? '',
    'posicion' => $_GET['posicion'] ?? ''
];

$results = $listResults->getResults($filters);
?>

<!DOCTYPE HTML>
<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <meta name="author" content="Ignacio Hovan Rojas" />
    <meta name="description" content="pagina con viajes disponibles" />
    <meta name ="keywords" content ="viajes, lugares" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/pagina.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico" />
    <title>Ver resultados</title>
</head>

<body>
    <header>
        <h1><a href="index.html" title="Inicio">F1 Desktop</a></h1>
        <nav>
            <a href="index.html" title="Inicio">Inicio</a>
            <a href="piloto.html" title="piloto">Piloto</a>
            <a href="noticias.html" title="noticias">Noticias</a>
            <a href="calendario.html" title="calendario">Calendario</a>
            <a href="metereología.html" title="meteorología">Meteorología</a>
            <a href="circuito.html" title="circuito">Circuito</a>
            <a href="viajes.php" title="viajes">Viajes</a>
            <a href="juegos.html" title="juegos"class="active">Juegos</a>
        </nav>
    </header>
    <p>
        Estás en: <a href="index.html" title="Inicio">Inicio</a> | <a href="juegos.html" title="Juegos">Juegos</a> |
        <a href="pagina.php" title="Pagina">Pagina</a> | Lista
    </p>
    <main>
        <h2>Resultados de Carreras</h2>

        <form method="GET" action="list_results.php">
            <label for="piloto">Piloto:</label>
            <input type="text" name="piloto" id="piloto">

            <label for="carrera">Carrera:</label>
            <input type="text" name="carrera" id="carrera" >

            <label for="posicion">Posición:</label>
            <input type="number" name="posicion" id="posicion" >

            <button type="submit">Filtrar</button>
        </form>
        <?php

        // Mostrar los resultados
        if ($results) {
            echo "<table>";
            echo "<tr><th scope='col' id='Piloto'>Piloto</th>
            <th scope='col' id='Carrera'>Carrera</th><th scope='col' id='Posicion'>Posición</th>
            <th scope='col' id='Puntos'>Puntos</th></tr>";
            foreach ($results as $row) {
                echo "<tr>";
                echo "<td headers='Piloto'>" . $row['piloto'] . "</td>";
                echo "<td headers='Carrera'>" . $row['carrera'] . "</td>";
                echo "<td headers='Posicion'>" . $row['posicion'] . "</td>";
                echo "<td headers='Puntos'>" . $row['puntos'] . "</td>";
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "No se encontraron resultados.";
        }
        ?>
    </main>
</body>
</html>
