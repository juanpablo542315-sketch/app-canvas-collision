const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const N = 10;

class Circulo {
    constructor(x, y, r, dx, dy, id) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.id = id;
        this.color = "blue";
    }

    dibujar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.fillText(this.id, this.x - 5, this.y + 5);
    }

    mover() {
        this.x += this.dx;
        this.y += this.dy;

        // Rebote con bordes
        if (this.x - this.r < 0 || this.x + this.r > canvas.width) {
            this.dx *= -1;
        }

        if (this.y - this.r < 0 || this.y + this.r > canvas.height) {
            this.dy *= -1;
        }
    }
}

let circulos = [];

// Crear círculos
for (let i = 0; i < N; i++) {
    let r = 30;
    let x = Math.random() * (canvas.width - 2 * r) + r;
    let y = Math.random() * (canvas.height - 2 * r) + r;
    let dx = (Math.random() - 0.5) * 4;
    let dy = (Math.random() - 0.5) * 4;

    circulos.push(new Circulo(x, y, r, dx, dy, i));
}

// 🔥 Colisiones reales
function detectarColisiones() {
    for (let i = 0; i < circulos.length; i++) {
        for (let j = i + 1; j < circulos.length; j++) {

            let c1 = circulos[i];
            let c2 = circulos[j];

            let dx = c2.x - c1.x;
            let dy = c2.y - c1.y;

            let distancia = Math.sqrt(dx * dx + dy * dy);
            let sumaRadios = c1.r + c2.r;

            if (distancia < sumaRadios) {

                // 🔹 Vector normal
                let nx = dx / distancia;
                let ny = dy / distancia;

                // 🔹 Producto punto (velocidad relativa)
                let p = 2 * (
                    (c1.dx * nx + c1.dy * ny) -
                    (c2.dx * nx + c2.dy * ny)
                ) / 2;

                // 🔹 Actualizar velocidades (rebote real)
                c1.dx = c1.dx - p * nx;
                c1.dy = c1.dy - p * ny;

                c2.dx = c2.dx + p * nx;
                c2.dy = c2.dy + p * ny;

                // 🔥 Separar círculos para evitar que se peguen
                let overlap = sumaRadios - distancia;
                c1.x -= overlap * nx / 2;
                c1.y -= overlap * ny / 2;
                c2.x += overlap * nx / 2;
                c2.y += overlap * ny / 2;

                // 🎨 Cambiar color al colisionar
                c1.color = "red";
                c2.color = "red";
            } else {
                // Regresar color normal si no hay colisión
                c1.color = "blue";
                c2.color = "blue";
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