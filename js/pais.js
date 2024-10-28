
"use strict"; 
class Pais {

    constructor (nombrePais, nombreCapital, nombreCircuito, poblacion){
        this.nombrePais=nombrePais;
        this.nombreCapital=nombreCapital;
        this.nombreCircuito=nombreCircuito;
        this.poblacion=poblacion;

    }
    rellenarInformacion(){
        this.gobierno = "República federal constitucional";
        this.religion = "Cristianismo";
        this.coordernadasMeta = "-115.176468, 36.188110";
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
}
var estadosUnidos = new Pais("Estados unidos", "Washington D.C.", "Las Vegas Strip Circuit", 331_449_281);
estadosUnidos.rellenarInformacion();

document.write("<p>" + estadosUnidos.getNombrePais + ", " + estadosUnidos.getNombreCapital + "</p>");
document.write(estadosUnidos.getInfoSecundaria);
estadosUnidos.escribirCoordenadasLineMeta();

    