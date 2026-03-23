const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const N = 15; // Número de círculos

class Circulo {
    constructor(x, y, r, dx, dy, id) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.id = id;
        this.color = "#3498db"; // Azul inicial
    }

    dibujar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color; // Usar fillStyle para color de fondo
        ctx.fill(); 
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();

        // Texto del ID
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.fillText(this.id, this.x - 5, this.y + 5);
    }

    mover() {
        // Rebote en bordes
        if (this.x + this.r > canvas.width || this.x - this.r < 0) this.dx = -this.dx;
        if (this.y + this.r > canvas.height || this.y - this.r < 0) this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;
    }
}

let circulos = [];
for (let i = 0; i < N; i++) {
    let r = 25;
    let x = Math.random() * (canvas.width - r * 2) + r;
    let y = Math.random() * (canvas.height - r * 2) + r;
    let dx = (Math.random() - 0.5) * 6;
    let dy = (Math.random() - 0.5) * 6;
    circulos.push(new Circulo(x, y, r, dx, dy, i));
}

function detectarColisiones() {
    for (let i = 0; i < circulos.length; i++) {
        for (let j = i + 1; j < circulos.length; j++) {
            let c1 = circulos[i];
            let c2 = circulos[j];

            let dx = c2.x - c1.x;
            let dy = c2.y - c1.y;
            let distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia < c1.r + c2.r) {
                // --- REBOTE FÍSICO (INCISO C) ---
                let normalX = dx / distancia;
                let normalY = dy / distancia;

                let p = 2 * (c1.dx * normalX + c1.dy * normalY - c2.dx * normalX - c2.dy * normalY) / 2;

                c1.dx -= p * normalX;
                c1.dy -= p * normalY;
                c2.dx += p * normalX;
                c2.dy += p * normalY;

                // Prevenir que se queden pegados (separación técnica)
                let overlap = (c1.r + c2.r - distancia) / 2;
                c1.x -= overlap * normalX;
                c1.y -= overlap * normalY;
                c2.x += overlap * normalX;
                c2.y += overlap * normalY;

                // --- CAMBIO DE COLOR ---
                c1.color = "#e74c3c"; // Rojo al chocar
                c2.color = "#e74c3c";
            } else {
                // Opcional: Volver al azul si no están tocando nada
                // (Si quieres que se queden rojos para siempre quita esto)
                // c1.color = "#3498db"; 
            }
        }
    }
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    detectarColisiones();
    circulos.forEach(c => {
        c.mover();
        c.dibujar();
    });
    requestAnimationFrame(animar);
}

animar();
