<?php 
    class Moneda {
        private $siglasLocal = "";
        private $siglasForeign = "";
        
        
        public function __construct($siglasLocal, $siglasForeign){
            $this->siglasForeign = $siglasForeign;
            $this->siglasLocal = $siglasLocal;
            
        }
        public function getUrl(): float{
            $apiUrl = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_n5jep9KDAmlt9QEVLOFxUooneO8215SVkUuiYgde&currencies=".$this->siglasForeign."&base_currency=".$this->siglasLocal;
            // Use cURL to fetch data from the API
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $apiUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $response = curl_exec($ch);
            $data = json_decode($response, true);

            if (isset($data['data'][$this->siglasForeign])) { 
                $value = $data['data'][$this->siglasForeign]; 
            } 

            // Close the cURL handle
            curl_close($ch);
            return $value;
        }
    }
    class Carrusel {
        private $nombreCapital;
        private $nombrePais;
        
        public function __construct($nombreCapital, $nombrePais){
            $this->nombreCapital = $nombreCapital;
            $this->nombrePais = $nombrePais;
        }
        public function getCapital(): string{
            return $this->nombreCapital;
        }
        public function getPais(): string{
            return $this->nombrePais;
        }
    }
    $carrusel = new Carrusel("LasVegas", "EstadosUnidos");
    $api_key = '80813d89558fab34f8bd6ae5edc55fd3';
    $tag = $carrusel->getCapital().",".$carrusel->getPais();
    $perPage = 4;
    // Fotos públicas recientes
    $url = 'https://api.flickr.com/services/feeds/photos_public.gne?';
    $url.= '&tags='.$tag;
    $url.= '&per_page='.$perPage;
    $url.= '&format=json';
    $url.= '&nojsoncallback=1';
    $respuesta = file_get_contents($url);
    $json = json_decode($respuesta);
    
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
    <link rel="icon" href="multimedia/imagenes/favicon.ico" />
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />
    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.js'></script>
    <script src="js/viajes.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <title>Viajes</title>
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
            <a href="viajes.php" title="viajes" class="active">Viajes</a>
            <a href="juegos.html" title="juegos">Juegos</a>
        </nav>
    </header>
    <p>
        Estás en: <a href="index.html" title="Inicio">Inicio</a> | Viajes
    </p>
    <main>
        <h2>Viajes</h2>
        <!-- Slider container -->
    
    <?php
    $miDinero = 0;
    $miDineroCambiado = 0;
    if (count($_POST)>0) 
    {   
        $m = new Moneda("EUR","USD");
        $miDinero = $_POST["dinero"];
        $miDineroCambiado = $m->getUrl()*$miDinero;
    }
    
    echo "  
            <form action='#' method='post' name='calculadora'>
                <label>Inserte la cantidad de euros que quiere convertir a dolares americanos:
                    <input type='text' name='dinero' value='$miDinero'/>
                </label>
                <label>Dinero en dolares:
                    <input type='text' name='dineroCambiado' value='$miDineroCambiado' readonly/>
                </label>           
                <input type='submit'  value='Calcular'/>
            </form>
        ";
    ?>
        <figure>
            <input type="button" value="Obtener mapa estático" onClick = "miMapa.getMapaEstaticoMapBox('ubicacion');"/>
        </figure>
        <figure>
            <input type="button" value="Obtener mapa dinamico" onClick = "miMapa.getMapaDinamicoMapBox('ubicacion');"/>
        </figure>
        <article>
        <h3>Slider</h3>
        <?php
        for($i=0;$i<$perPage;$i++) {
            $titulo = $json->items[$i]->title;
            $URLfoto = $json->items[$i]->media->m;       
            print "<img alt='".$titulo."' src='".$URLfoto."' />";
        }
        
        ?>
    <!-- Control buttons -->
        <button> &gt; </button>
        <button> &lt; </button>
        
    </article>
    </main>

</body>
</html>