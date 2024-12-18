"use strict"; 
class Agenda {
    constructor() {
        // URL de la API para obtener las carreras de la temporada 2024
        this.url = "https://ergast.com/api/f1/current.json";
    }

    cargarCarreras() {
        $.ajax({
            url: this.url,  // URL de la API para obtener las carreras de la temporada actual
            method: "GET",
            dataType: "json",  // Esperamos la respuesta en formato JSON
            success: function(data) {
                // Extraemos las carreras desde la respuesta JSON
                let races = data.MRData.RaceTable.Races;
                let output = "<h2>Calendario de Carreras 2024</h2>";  // Contenido inicial de la página

                // Recorremos las carreras y mostramos la información relevante
                races.forEach(function(race) {
                    let raceName = race.raceName;  // Nombre de la carrera
                    let circuitName = race.Circuit.circuitName;  // Nombre del circuito
                    let locality = race.Circuit.Location.locality;  // Localidad
                    let country = race.Circuit.Location.country;  // País
                    let date = race.date;  // Fecha de la carrera
                    let time = race.time ? race.time : 'N/A';  // Hora de la carrera (si existe)

                    // Generamos el HTML para mostrar la información de la carrera
                    output += `
                        <article>
                            <h3>${raceName}</h3>
                            <p>Circuito: ${circuitName}</p>
                            <p>Ubicación: ${locality}, ${country}</p>
                            <p>Fecha: ${date} a las ${time} UTC</p>
                        </article>
                    `;
                });

                // Actualizamos el contenido del <main> con la información de las carreras
                $("main").html(output);
            },
            error: function(xhr, status, error) {
                // En caso de error, mostramos un mensaje de advertencia
                console.error("Error al cargar las carreras: " + error);
                alert("Hubo un error al cargar la información de las carreras.");
            }
        });
    }
}
var agenda = new Agenda();