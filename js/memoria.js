"use strict";

class Memoria {
    elements = [
        { "element": "RedBull", "source": "multimedia/imagenes/Red_Bull_Racing_logo.svg" },
        { "element": "McLaren", "source": "multimedia/imagenes/McLaren_Racing_logo.svg" },
        { "element": "Alpine", "source": "multimedia/imagenes/Alpine_F1_Team_2021_Logo.svg" },
        { "element": "AstonMartin", "source": "multimedia/imagenes/Aston_Martin_Aramco_Cognizant_F1.svg" },
        { "element": "Ferrari", "source": "multimedia/imagenes/Scuderia_Ferrari_Logo.svg" },
        { "element": "Mercedes", "source": "multimedia/imagenes/Mercedes_AMG_Petronas_F1_Logo.svg" },
        { "element": "RedBull", "source": "multimedia/imagenes/Red_Bull_Racing_logo.svg" },
        { "element": "McLaren", "source": "multimedia/imagenes/McLaren_Racing_logo.svg" },
        { "element": "Alpine", "source": "multimedia/imagenes/Alpine_F1_Team_2021_Logo.svg" },
        { "element": "AstonMartin", "source": "multimedia/imagenes/Aston_Martin_Aramco_Cognizant_F1.svg" },
        { "element": "Ferrari", "source": "multimedia/imagenes/Scuderia_Ferrari_Logo.svg" },
        { "element": "Mercedes", "source": "multimedia/imagenes/Mercedes_AMG_Petronas_F1_Logo.svg" }
    ];

    constructor() {
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;

        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }

    shuffleElements() {
        let currentIndex = this.elements.length;
        while (currentIndex !== 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.elements[currentIndex], this.elements[randomIndex]] = [
                this.elements[randomIndex], this.elements[currentIndex]
            ];
        }
    }

    createElements() {
        this.elements.forEach((item) => {
            let card = document.createElement("article");
            card.setAttribute("data-element", item.element);
            card.setAttribute("data-state", "unflipped");

            let title = document.createElement("h3");
            title.textContent = "Tarjeta de Memoria";

            let cardImage = document.createElement("img");
            cardImage.src = item.source;
            cardImage.alt = item.element;

            card.appendChild(title);
            card.appendChild(cardImage);
            document.querySelector("main").appendChild(card);
        });
    }

    

    checkForMatch() {
        this.lockBoard = true;

        let isMatch = this.firstCard.getAttribute("data-element") === this.secondCard.getAttribute("data-element");

        if (isMatch) {
            this.disableCards();
        } else {
            this.unflipCards();
        }
    }

    disableCards() {
        this.firstCard.setAttribute("data-state", "revealed");
        this.secondCard.setAttribute("data-state", "revealed");
        this.resetBoard();
    }

    unflipCards() {
        setTimeout(() => {
            this.firstCard.setAttribute("data-state", "unflipped");
            this.secondCard.setAttribute("data-state", "unflipped");
            this.resetBoard();
        }, 1000);
    }

    resetBoard() {
        [this.hasFlippedCard, this.lockBoard] = [false, false];
        [this.firstCard, this.secondCard] = [null, null];
    }

    flipCard(card) {
        if(this.lockBoard == true){
            return;
        }
        if(card.getAttribute("data-state") == "revealed"){
            return;
        }
        if(card == this.firstCard){
            return;
        }
        card.setAttribute("data-state", "flip");
        if (!this.hasFlippedCard) {
            this.hasFlippedCard = true;
            this.firstCard = card;
        } else {
            this.lockBoard = true;
            this.secondCard = card;
            this.checkForMatch();
        }
    }

    addEventListeners() {
        const cards = document.querySelectorAll("article");
        cards.forEach((card) => {
            card.addEventListener("click", this.flipCard.bind(this, card));
        });
    }
}

// Inicia el juego creando una instancia de la clase Memoria
const game = new Memoria();

