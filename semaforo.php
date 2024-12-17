<?php 
    class Record {
        protected $server;
        protected $user;
        protected $pass;
        protected $dbname;
        
        public function __construct(){
            $this->server = "localHost";
            $this->user = "DBUSER2024";
            $this->pass = "DBPSWD2024";
            $this->dbname = "records";
        }
        public function getServer(): string{
            return $this->server;
        }
        public function getUser(): string{
            return $this->user;
        }
        public function getPassword(): string{
            return $this->pass;
        }
        public function getDbName(): string{
            return $this->dbname;
        }
    }
    function getRanking($pdo,$difficulty) {
        $sql2 = "SELECT name, surname, time from registro where difficulty = ".$difficulty." order by time";
        $quantity = 1;
        echo "<section><h2>Ranking</h2>";
        foreach ($pdo->query($sql2) as $row) {
            $quantity +=1;
            echo $row['name'] . " " . $row['surname'] . " ". $row['time'] ."<br />";
            if($quantity>10){
                break;
            }
        }
        echo "</section>";
      }
    if (count($_POST)>0) 
    {   
        $record = new Record();
        $pdo = new PDO( 'mysql:host='.$record->getServer().';dbname='.$record->getDbName().';charset=utf8',   $record->getUser(),  $record->getPassword());
        $name = $_POST['name'];
        $surname = $_POST['surname'];
        $difficulty = $_POST['difficulty'];
        $time = $_POST['time'];
        $sql = "INSERT INTO registro (name, surname, difficulty, time) VALUES ('".$name."', '".$surname."','".$difficulty."', '".$time."')";
        if ($pdo->exec($sql) === 1)
            echo "";
       
    }
    
?>
<!DOCTYPE HTML>
<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <meta name="author" content="Ignacio Hovan Rojas" />
    <meta name="description" content="pagina con juegos varios" />
    <meta name ="keywords" content ="juegos, resultado" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/semaforo_grid.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script> 
    <title>Reaccion</title>
    <script src="js/semaforo.js"></script>
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
            <a href="juegos.html" title="juegos" class="active">Juegos</a>
        </nav>
    </header>
    <p>
        Estás en: <a href="index.html" title="Inicio">Inicio</a> | <a href="juegos.html" title="Juegos">Juegos</a> | Reaccion
    </p>
    <main>
    <script>
        new Semaforo();
    </script>
    <?php 
    if (count($_POST)>0) 
    { 
     getRanking($pdo,$difficulty);
    }
    ?>
    </main>
    
</body>
</html>