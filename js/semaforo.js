
"use strict"; 
class Semaforo {
    level = [0.2,0.5,0.8];
    lights = 4;
    unload_moment = null;
    clic_moment = null;
    i = 0;

    constructor (){       
        this.difficulty =  this.level[Math.floor(Math.random() * this.level.length)];
        this.createStructure();
        this.initSequence();
    }

    createStructure(){
        let main = document.querySelector("main");
        let title = document.createElement("h2");
        title.textContent = "Semáforos";
        main.appendChild(title);
        for(let i = 0;i<this.lights;i++){
            let div = document.createElement("div");
            main.appendChild(div);
        }
        let button1 = document.createElement("button");
        button1.textContent = "arrancar";
        let button2 = document.createElement("button");
        button2.textContent = "parar";
        button2.disabled = true;
        main.appendChild(button1);
        main.appendChild(button2);
    }

    clickArrancar(){
        var main = document.getElementsByTagName('main')[0];
        main.classList.add('load');
        const button = document.querySelector("button");
        button.disabled = true;
        setTimeout(() => {
            this.unload_moment =new Date();
            this.endSequence();
        }, (2000 + (this.difficulty*100)));
    }
    initSequence(){
        const button = document.querySelector("button");
        button.addEventListener("click", this.clickArrancar.bind(this) );
    }
    stopReaction(){
        this.clic_moment = new Date();
        const button1 = document.querySelectorAll("button")[0];
        button1.disabled = false;
        const button2 = document.querySelectorAll("button")[1];
        button2.disabled = true;
        var main = document.querySelector('main');
        main.classList.remove("unload");
        main.classList.remove("load");
        this.createRecordForm();

    }
    endSequence(){
        var main = document.querySelector('main');
        main.classList.add('unload'); 
        const button = document.querySelectorAll("button")[1];
        button.disabled = false;
        button.onclick = this.stopReaction.bind(this);

    }

    createRecordForm(){
        var label = document.createElement("label");
        var input = document.createElement("input");
        label.innerHTML = "Nombre";
        label.append(input);
        $("main").append(label);
        var label2 = document.createElement("label");
        var input2 = document.createElement("input");
        label2.innerHTML = "Apellidos";
        label2.append(input2);
        $("main").append(label2);
        var label3 = document.createElement("label");
        var input3 = document.createElement("input");
        label3.innerHTML = "Nivel";
        $(input3).attr("value",this.difficulty);
        $(input3).attr("readonly",true);
        label3.append(input3);
        $("main").append(label3);
        var label4 = document.createElement("label");
        var input4 = document.createElement("input");
        label4.innerHTML = "Tiempo de reaccion";
        var value = "Tu tiempo de reacción es "+(this.clic_moment- this.unload_moment)/1000 + "s";
        $(input4).attr("value",value);
        $(input4).attr("readonly",true);
        label4.append(input4);
        $("main").append(label4);
    }
}
    
new Semaforo();