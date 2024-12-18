
class RacingGame {
    constructor(canvas, startButton) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.startButton = startButton;

        this.carX = 0;
        this.carY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.isPointerLocked = false;
        this.startTime = null;
        this.penaltyTime = 0;
        this.laps = 0;
        this.hasCrossedLine = false;
        this.markersPassed = 0;

        this.initCanvasSize();
        this.initCircuit();
        this.initCarPosition();
        this.setupEventHandlers();
    }

    initCanvasSize() {
        this.canvas.width = window.innerWidth + 100;
        this.canvas.height = window.innerHeight;
    }

    initCircuit() {
        const offsetX = this.canvas.width / 2 - 100;
        const offsetY = this.canvas.height / 2 - 350;

        this.circuitPath = [
            { x: 100, y: 50 },
            { x: 150, y: 150 },
            { x: 250, y: 250 },
            { x: 300, y: 350 },
            { x: 250, y: 450 },
            { x: 150, y: 550 },
            { x: 100, y: 450 },
            { x: 50, y: 350 },
            { x: 100, y: 50 }
        ].map(point => ({
            x: point.x + offsetX,
            y: point.y + offsetY
        }));

        this.markers = [
            { x: 100, y: 50 },
            { x: 150, y: 150 },
            { x: 250, y: 250 },
            { x: 300, y: 350 },
            { x: 250, y: 450 },
            { x: 150, y: 550 },
            { x: 100, y: 450 },
            { x: 50, y: 350 }
        ].map(marker => ({
            x: marker.x + offsetX,
            y: marker.y + offsetY
        }));

        this.finishLine = {
            x1: this.circuitPath[2].x - 15,
            y1: this.circuitPath[1].y + 50,
            x2: this.circuitPath[2].x - 30,
            y2: this.circuitPath[2].y
        };
    }

    initCarPosition() {
        this.carX = this.circuitPath[2].x - 25;
        this.carY = this.circuitPath[2].y;
    }

    setupEventHandlers() {
        this.startButton.addEventListener("click", () => this.startGame());

        if (this.detectTouchSupport()) {
            let touchStartX = 0, touchStartY = 0;

            document.addEventListener("touchstart", (e) => {
                if (e.touches.length > 0) {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                }
            }, { passive: false });

            document.addEventListener("touchmove", (e) => {
                e.preventDefault();
                if (e.touches.length > 0) {
                    const touch = e.touches[0];
                    this.deltaX = (touch.clientX - touchStartX) * 1;
                    this.deltaY = (touch.clientY - touchStartY) * 1;
                    touchStartX = touch.clientX;
                    touchStartY = touch.clientY;
                }
            }, { passive: false });
        } else {
            document.addEventListener("pointerlockchange", () => {
                this.isPointerLocked = document.pointerLockElement === this.canvas;
            });

            document.addEventListener("mousemove", (e) => {
                if (this.isPointerLocked) {
                    this.deltaX = e.movementX;
                    this.deltaY = e.movementY;
                }
            });
        }
    }

    detectTouchSupport() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    drawCircuit() {
        const ctx = this.ctx;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 40;

        ctx.beginPath();
        ctx.moveTo(this.circuitPath[0].x, this.circuitPath[0].y);
        for (let i = 1; i < this.circuitPath.length; i++) {
            ctx.lineTo(this.circuitPath[i].x, this.circuitPath[i].y);
        }
        ctx.closePath();
        ctx.stroke();

        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 20;
        ctx.beginPath();
        ctx.moveTo(this.finishLine.x1, this.finishLine.y1);
        ctx.lineTo(this.finishLine.x2, this.finishLine.y2);
        ctx.stroke();

        ctx.fillStyle = "blue";
        this.markers.forEach(marker => {
            ctx.beginPath();
            ctx.arc(marker.x, marker.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    isCarOnTrack(x, y) {
        const ctx = this.ctx;
        ctx.save();
        ctx.lineWidth = 40;
        ctx.beginPath();
        ctx.moveTo(this.circuitPath[0].x, this.circuitPath[0].y);
        for (let i = 1; i < this.circuitPath.length; i++) {
            ctx.lineTo(this.circuitPath[i].x, this.circuitPath[i].y);
        }
        ctx.closePath();
        const isOnTrack = ctx.isPointInStroke(x, y);
        ctx.restore();
        return isOnTrack;
    }

    drawCar() {
        const ctx = this.ctx;
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.carX, this.carY, 15, 0, Math.PI * 2);
        ctx.fill();
    }

    updateCar() {
        this.carX += this.deltaX;
        this.carY += this.deltaY;

        this.deltaX = 0;
        this.deltaY = 0;

        this.carX = Math.max(0, Math.min(this.canvas.width, this.carX));
        this.carY = Math.max(0, Math.min(this.canvas.height, this.carY));

        if (!this.isCarOnTrack(this.carX, this.carY)) {
            this.penaltyTime += 0.05;
        }
    }

    checkFinishLine() {
        const crossedLine = (
            this.carX > Math.min(this.finishLine.x1, this.finishLine.x2) &&
            this.carX < Math.max(this.finishLine.x1, this.finishLine.x2) &&
            this.carY > Math.min(this.finishLine.y1, this.finishLine.y2) - 10 &&
            this.carY < Math.max(this.finishLine.y1, this.finishLine.y2) + 10
        );

        if (crossedLine && this.markersPassed === this.markers.length && !this.hasCrossedLine) {
            this.laps++;
            this.markersPassed = 0;
            this.hasCrossedLine = true;
        } else if (!crossedLine) {
            this.hasCrossedLine = false;
        }
    }

    checkMarkers() {
        for (let i = this.markersPassed; i < this.markers.length; i++) {
            const marker = this.markers[i];
            const distance = Math.hypot(this.carX - marker.x, this.carY - marker.y);
            if (distance < 10) {
                this.markersPassed++;
                break;
            }
        }
    }

    gameLoop(timestamp) {
        if (!this.startTime) this.startTime = timestamp;
        const elapsedTime = ((timestamp - this.startTime) / 1000).toFixed(2);
        const totalTime = (parseFloat(elapsedTime) + this.penaltyTime).toFixed(2);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawCircuit();
        this.drawCar();
        this.updateCar();

        this.checkFinishLine();
        this.checkMarkers();

        this.ctx.fillStyle = "darkred";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(`Tiempo: ${elapsedTime}s`, 20, 30);
        this.ctx.fillText(`Penalización: +${this.penaltyTime.toFixed(2)}s`, 20, 60);
        this.ctx.fillText(`Total: ${totalTime}s`, 20, 90);
        this.ctx.fillText(`Vueltas: ${this.laps}/3`, 20, 120);

        if (this.laps >= 3) {
            this.ctx.fillStyle = "darkred";
            this.ctx.font = "40px Arial";
            this.ctx.fillText("¡Juego terminado!", this.canvas.width / 2 - 150, this.canvas.height / 2);
            this.ctx.fillText(`Tiempo final: ${totalTime}s`, this.canvas.width / 2 - 150, this.canvas.height / 2 + 50);

            const bestTime = localStorage.getItem("bestTime");
            if (!bestTime || parseFloat(totalTime) < parseFloat(bestTime)) {
                localStorage.setItem("bestTime", totalTime);
            }

            this.ctx.fillText(`Mejor tiempo: ${localStorage.getItem("bestTime")}s`, 20, this.canvas.height - 30);
            return;
        }

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    startGame() {
        this.startButton.style.display = "none";
        if (!this.detectTouchSupport()) {
            this.canvas.requestPointerLock();
        }
        this.startTime = null;
        this.penaltyTime = 0;
        this.laps = 0;
        this.markersPassed = 0;
        this.hasCrossedLine = false;
        this.gameLoop(0);
    }
}

const canvas = document.querySelector("canvas");
const startButton = document.querySelector("button");
const game = new RacingGame(canvas, startButton);

