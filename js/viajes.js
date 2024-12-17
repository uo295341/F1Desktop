
"use strict";
class Viajes {
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }
    getPosicion(posicion){
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }
    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }
    getLongitud(){
        return this.longitud;
    }
    getLatitud(){
        return this.latitud;
    }
    getAltitud(){
        return this.altitud;
    }

    getMapaEstaticoMapBox(dondeVerlo){
        var ubicacion=document.querySelector("figure");
        const button1 = document.querySelectorAll("input")[3];
        button1.disabled = true;
        var apiKey = "?access_token=sk.eyJ1IjoidW8yOTUzNDEiLCJhIjoiY20zbjJndjJnMDBvbTJpcjd3YmYyOGd4ciJ9.upSdBh463bBJT0xp_mZ9Qw";
        //URL: obligatoriamente https
        var url = "https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/";
        
        //Parámetros
        // centro del mapa (obligatorio si no hay marcadores)
        var lonlatzoom =  this.longitud + "," + this.latitud + "," + "17,0";
        //Tamaño del mapa en pixeles (obligatorio)
        var tamaño= "/1280x1280";

        
        this.imagenMapa = url + lonlatzoom +tamaño  + apiKey;
        ubicacion.innerHTML += "<br><img src='"+this.imagenMapa+"' alt='mapa estático mapboox' />";
        
    }
    getMapaDinamicoMapBox(dondeVerlo){
        
        var ubicacion=document.querySelectorAll("figure")[1];
        const button1 = document.querySelectorAll("input")[4];
        button1.disabled = true;
        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yOTUzNDEiLCJhIjoiY20zbjF0dDEwMTlnMzJscW9wMjdoaXR1NiJ9.MJKfNeuIRrs4F2FI3s0YbA'; // Nuestro Token de acceso
        var map = new mapboxgl.Map({
            container: ubicacion, // id del contenedor
            style: 'mapbox://styles/mapbox/streets-v9', // localización del mapa de estilo
            center: [ this.longitud,this.latitud], // Posición inicial
            zoom: 13 // Zoom inicial
        });
        if(map.style.visibility == true){
            map.resize();
        }
    }

}
var miMapa = new Viajes();
document.addEventListener("DOMContentLoaded",function(){
    const slides = document.querySelectorAll("img");

        // select next slide button
        const nextSlide = document.querySelector("button:nth-of-type(1)");

        // current slide counter
        let curSlide = 3;
        // maximum number of slides
        let maxSlide = slides.length - 1;

        // add event listener and navigation functionality
        nextSlide.addEventListener("click", function () {
        // check if current slide is the last and reset current slide
        if (curSlide === maxSlide) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        //   move slide by -100%
        slides.forEach((slide, indx) => {
            var trans = 100 * (indx - curSlide);
            $(slide).css('transform', 'translateX(' + trans + '%)');
        });
        });

        // select next slide button
        const prevSlide = document.querySelector("button:nth-of-type(2)");

        // add event listener and navigation functionality
        prevSlide.addEventListener("click", function () {
        // check if current slide is the first and reset current slide to last
        if (curSlide === 0) {
            curSlide = maxSlide;
        } else {
            curSlide--;
        }

        //   move slide by 100%
        slides.forEach((slide, indx) => {
            var trans = 100 * (indx - curSlide);
            $(slide).css('transform', 'translateX(' + trans + '%)');
        });
        });
});