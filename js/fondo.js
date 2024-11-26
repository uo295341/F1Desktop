"use strict"; 
class Fondo {

    constructor(nombrePais, nombrCapital, nombreCircuito){
        this.nombrCapital = nombrCapital;
        this.nombrePais = nombrePais;
        this.nombreCircuito = nombreCircuito;
        this.apiCall();
    }

    apiCall(){
        var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

        $.getJSON(flickrAPI, {
            tags: "Las Vegas, Formula 1",
            tagmode: "all",
            format: "json"
        })
        .done(function(data) {
            // Only use the first image retrieved
            if (data.items.length > 0) {
                var imageUrl = data.items[0].media.m;
                $("body").css({
                    "background-image": "url(" + imageUrl.replace("_m","_b") + ")",
                    "background-size": "cover",
                    "background-repeat": "no-repeat",
                    "height": "100vh", 
                    "background-position": "center" 
                    
                });
            }
            
        });
    }
}

