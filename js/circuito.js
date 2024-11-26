"use strict"; 

class Circuito {

Circuito(){
    if (window.File && window.FileReader && window.FileList && window.Blob) 
    {  
        this.supports = true;
        
    }
        else{
          this.supports = false;
        }
  } 

leerArchivoTexto(files) { 
  var archivo = files[0];
  //Solamente admite archivos de tipo texto
  var tipoTexto = /text.*/;
  if (archivo.type.match(tipoTexto)) 
    {
      var lector = new FileReader();
      lector.onload = function (evento) {
        //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
        //La propiedad "result" es donde se almacena el contenido del archivo
        //Esta propiedad solamente es válida cuando se termina la operación de lectura
        var dom = new DOMParser().parseFromString(lector.result,"text/xml");
        var article = document.createElement("section");
        
        $(dom).find("circuito").each(function(){
          article.innerHTML = "<h3>" + $(this).attr("nombre") +"</h3>";
          article.innerHTML += "<p>Fecha de la carrera " +this.querySelector("fecha").textContent + " " +this.querySelector("hora").textContent+ "</p>";
          article.innerHTML += "<p>Longitud de la pista: " +this.querySelector("largo").textContent + " " +$(this).find("largo").attr("unidad")+ "</p>";
          article.innerHTML += "<p>Anchura media de la pista: " +this.querySelector("anchura").textContent + " " +$(this).find("largo").attr("unidad")+ "</p>";
          article.innerHTML += "<p>Localicacion: " +this.querySelector("localidad").textContent + ", " +this.querySelector("pais").textContent+ "</p>";
          article.innerHTML += "<p>Numero de vueltas: " +this.querySelector("vueltas").textContent +"</p>";
          article.innerHTML += "<h4>Bibliografia: </h4>";
          $(this).find("bibliografia").find("url").each(function(){
            article.innerHTML += "<p><a href=\"" +this.textContent +"\">"+this.textContent +"</a></p>";
          });
          article.innerHTML += "<h4>Multimedia</h4>";
          $(this).find("multimedia").find("imagenes").find("imagen").each(function(){
            article.innerHTML += "<img src = \"xml/"+ this.textContent+"\" alt = \""+this.textContent+"\"/>";
          });
          $(this).find("multimedia").find("videos").find("video").each(function(){
            article.innerHTML += "<video controls>  <source src=\"xml/"+ this.textContent+"\" type =\"video/mp4\"/>";
            
          });
          article.innerHTML += "<h4>Coordenadas circuito</h4>";
          $(this).find("coordenadas").find("centro").each(function(){
            article.innerHTML += "<p>Centro del circuito: " +"<ul><li> Altitud: " +this.querySelector("altitud").textContent+ "</li>"+
            "<li> Latitud: " +this.querySelector("latitud").textContent+ "</li>"+"<li> Longitud: " +this.querySelector("longitud").textContent+ "</li></ul></p>";    
          });
          var orderedList = document.createElement("ol");
          $(this).find("coordenadas").find("puntos").each(function(){
            let list = document.createElement("li");
            let unorderedList = document.createElement("ul");
            unorderedList.innerHTML += "<li>Tamaño del tramo: " +this.querySelector("longitudTramo").textContent + " " +$(this).find("longitudTramo").attr("unidad") + "</li>";
            unorderedList.innerHTML += "<li>Altitud: " +this.querySelector("puntoFinal").querySelector("altitudPunto").textContent + " " +$(this).find("puntoFinal").find("altitudPunto").attr("unidad") + "</li>";
            unorderedList.innerHTML += "<li>Longitud: " +this.querySelector("puntoFinal").querySelector("longitudPunto").textContent + " " +$(this).find("puntoFinal").find("longitudPunto").attr("unidad") + "</li>";
            unorderedList.innerHTML += "<li>Latitud: " +this.querySelector("puntoFinal").querySelector("latitudPunto").textContent + " " +$(this).find("puntoFinal").find("latitudPunto").attr("unidad") + "</li>";
            unorderedList.innerHTML += "<li>Sector: " +this.querySelector("puntoFinal").querySelector("sector").textContent + "</li>";
            list.append(unorderedList);
            console.log(list);
            orderedList.append(list);
            
          });
          article.append(orderedList);

        });
        $("label")[0].after(article);
        
      }      
      lector.readAsText(archivo);
      }          
}
previewFile(files) {
  var file = files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      var dom = new DOMParser().parseFromString(reader.result,"text/xml");
      var GeoJson = toGeoJSON.kml(dom);
      console.log(dom);
      var coordinates = dom.querySelector("Placemark Point coordinates").textContent.split(",");

      var ubicacion=document.createElement("figure");
      mapboxgl.accessToken = 'pk.eyJ1IjoidW8yOTUzNDEiLCJhIjoiY20zbjF0dDEwMTlnMzJscW9wMjdoaXR1NiJ9.MJKfNeuIRrs4F2FI3s0YbA'; // Nuestro Token de acceso
      var map = new mapboxgl.Map({
          container: ubicacion, // id del contenedor
          style: 'mapbox://styles/mapbox/streets-v9', // localización del mapa de estilo
          center: [ coordinates[0],coordinates[1]], // Posición inicial
          zoom: 12 // Zoom inicial
      });
      map.on('load', () => {
        map.addSource('circuit', {
            type: 'geojson',
            data: GeoJson
        });

        map.addLayer({
            'id': 'circuit',
            'type': 'line',
            'source': 'circuit',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#000000',
                'line-width': 3
            }
        });
    });
    $("label")[1].after(ubicacion);
    },
    false,
  );

  if (file) {
    reader.readAsText(file);
  }
}
leerArchivoSvg(files) { 
  //Solamente toma un archivo
  //var archivo = document.getElementById("archivoTexto").files[0];
  var archivo = files[0];
  var main = document.querySelector("main");
  var areaVisualizacion = document.createElement("figure");
  //Solamente admite archivos de tipo texto
  var tipoTexto = /image.*/;
  if (archivo.type.match(tipoTexto)) 
    {
      var lector = new FileReader();
      lector.onload = function (evento) {
        //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
        //La propiedad "result" es donde se almacena el contenido del archivo
        //Esta propiedad solamente es válida cuando se termina la operación de lectura
        areaVisualizacion.innerHTML = lector.result;
        main.append(areaVisualizacion);
        }      
      lector.readAsText(archivo);
      }          
}
}
var circuito = new Circuito();

