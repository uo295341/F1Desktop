
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
        let doc = document.querySelector("main");
        let timeReaction = document.createElement("p");
        timeReaction.textContent = (this.clic_moment- this.unload_moment)/1000 + "s";
        doc.appendChild(timeReaction);
        const button1 = document.querySelectorAll("button")[0];
        button1.disabled = false;
        const button2 = document.querySelectorAll("button")[1];
        button2.disabled = true;
        var main = document.querySelector('main');
        main.classList.remove("unload");
        main.classList.remove("load");

    }
    endSequence(){
        var main = document.querySelector('main');
        main.classList.add('unload'); 
        const button = document.querySelectorAll("button")[1];
        button.disabled = false;
        button.onclick = this.stopReaction.bind(this);

    }
}
    
new Semaforo();