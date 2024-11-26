"use strict"; 
class Noticias {

    constructor(){
        if(window.File && window.FileReader && window.FileList && window.Blob){
            this.acepta = true;
        }else{
            this.acepta = false;
        }
    }
    readInputFile(files){
        //Solamente toma un archivo
      var archivo = document.querySelectorAll("input")[0].files[0];
      let main = document.querySelector("main");
      var article = document.createElement("article");
      let title = document.createElement("h3");
      var areaVisualizacion = document.createElement("p");
      var author = document.createElement("footer");
      var authorContent = document.createElement("p");
      var errorArchivo = document.getElementById("errorLectura");
      
      //Solamente admite archivos de tipo texto
      var tipoTexto = /text.*/;
      if (archivo.type.match(tipoTexto)) 
        {
          var lector = new FileReader();
          lector.onload = function (evento) {
            //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
            //La propiedad "result" es donde se almacena el contenido del archivo
            //Esta propiedad solamente es válida cuando se termina la operación de lectura
                var lines = lector.result.split("_");
                let i = 0;
                
                while(i<lines.length-1){
                    let article = document.createElement("article");
                    let title = document.createElement("h3");
                    let areaVisualizacion = document.createElement("p");
                    let author = document.createElement("footer");
                    let authorContent = document.createElement("p");
                    authorContent = lines[lines.length-1];
                    author.append(authorContent);
                    title.textContent = lines[i++];
                    areaVisualizacion.textContent = lines[i++];
                    main.append(article);
                    article.append(title);
                    article.append(areaVisualizacion);
                    article.append(author);
                }
            }      
          lector.readAsText(archivo);
          
          }
      else {
          errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
          }   
    }

    addNewContent(){
        var input = document.querySelectorAll("input");
        let main = document.querySelector("main");
        var article = document.createElement("article");
        let title = document.createElement("h3");
        var areaVisualizacion = document.createElement("p");
        var author = document.createElement("footer");
        var authorContent = document.createElement("p");
        title.textContent = input[1].value;
        areaVisualizacion.textContent = input[2].value;
        authorContent.textContent = input[3].value;
        if(title.textContent == "" || authorContent.textContent == "" || areaVisualizacion.textContent == "" ){
            return;
        }
        main.append(article);
        article.append(title);
        article.append(areaVisualizacion);
        article.append(author);
        author.append(authorContent);
    }
}