"use strict"; 
class Pais {

    constructor (nombrePais, nombreCapital, nombreCircuito, poblacion){
        this.nombrePais=nombrePais;
        this.nombreCapital=nombreCapital;
        this.nombreCircuito=nombreCircuito;
        this.poblacion=poblacion;
        this.apikey = "fbf2fbce2bd5d930b9a6ddb8fbebbdac";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.latitud = "36.109017";
        this.longitud = "-115.162219";
        this.urlForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + this.latitud + "&lon=" + this.longitud + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;

    }
    rellenarInformacion(){
        this.gobierno = "República federal constitucional";
        this.religion = "Cristianismo";
        this.coordernadasMeta = "36.109017,-115.162219";
        console.log(this.urlForecast);
    }
    get getNombreCapital(){
        return "" + this.nombreCapital;
    }
    get getNombrePais(){
        return "" + this.nombrePais;
    }

    get getInfoSecundaria(){
        return "<p>" + this.nombreCircuito + ", " + this.poblacion + ", " + this.gobierno + ", " + this.religion + "</p>";
    }

    escribirCoordenadasLineMeta(){
        document.write("<p>" + this.coordernadasMeta + "</p>");
        
    }
    cargarDatosForecast() {
        $.ajax({
            dataType: "xml",
            url: this.urlForecast,
            method: 'GET',
            success: function(datos) {
                var dias = {}; 
                $(datos).find("time").each(function () {
                    var fechaCompleta = $(this).attr("from");
                    var fecha = fechaCompleta.split("T")[0]; 

                    if (!dias[fecha]) {
                        dias[fecha] = {
                            tempMaxTotal: 0,
                            tempMinTotal: 99999,
                            humedadTotal: 0,
                            lluviaTotal: 0,
                            iconos: {}, 
                            contador: 0
                        };
                    }
                    if(dias[fecha].tempMaxTotal < parseFloat($(this).find("temperature").attr("max"))){
                        dias[fecha].tempMaxTotal = parseFloat($(this).find("temperature").attr("max"));
                    }
                    if(dias[fecha].tempMinTotal > parseFloat($(this).find("temperature").attr("min"))){
                        dias[fecha].tempMinTotal = parseFloat($(this).find("temperature").attr("min"));
                    }
                    
                    dias[fecha].humedadTotal += parseFloat($(this).find("humidity").attr("value"));
                    dias[fecha].lluviaTotal += parseFloat($(this).find("precipitation").attr("value") || 0);
    
                    var icono = $(this).find("symbol").attr("var"); 
                    if (icono) {
                        if (!dias[fecha].iconos[icono]) {
                            dias[fecha].iconos[icono] = 0;
                        }
                        dias[fecha].iconos[icono]++;
                    }
    
                    dias[fecha].contador++;
                });
                for (var fecha in dias) {
                    var data = dias[fecha];
                    var tempMaxMedia = data.tempMaxTotal;
                    var tempMinMedia = data.tempMinTotal;
                    var humedadMedia = data.humedadTotal / data.contador;
                    var lluviaMedia = data.lluviaTotal / data.contador;
    
                    var iconoMasFrecuente = "";
                    var maxFrecuencia = 0;
                    for (var icono in data.iconos) {
                        if (data.iconos[icono] > maxFrecuencia) {
                            maxFrecuencia = data.iconos[icono];
                            iconoMasFrecuente = icono;
                        }
                    }
    
                    // URL o el código del icono más frecuente
                    var urlIcono = "https://openweathermap.org/img/wn/" + iconoMasFrecuente +"@2x.png";
    
                    // Aquí puedes crear elementos en HTML con jQuery para mostrar los datos
                    var forecastHtml = `
                        <article>
                            <h3>Pronóstico para ${fecha}</h3>
                            <p>Temperatura máxima: ${tempMaxMedia.toFixed(2)} °C</p>
                            <p>Temperatura mínima: ${tempMinMedia.toFixed(2)} °C</p>
                            <p>Humedad promedio: ${humedadMedia.toFixed(2)} %</p>
                            <p>Precipitación promedio: ${lluviaMedia.toFixed(2)} mm</p>
                            <img src="${urlIcono}" alt="Icono del clima">
                        </article>
                    `;
                    
                    $("main").append(forecastHtml);
                }
            }
        });
    }

    verForecast() {
        this.cargarDatosForecast();
    }

    
}


    