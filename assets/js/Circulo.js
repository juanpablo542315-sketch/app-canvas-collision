class Circulo {
    constructor(x, y, r, dx, dy, id, canvas) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.id = id;
        this.canvas = canvas;
        this.color = "#6f42c1"; // Morado como en tu foto
    }

    dibujar(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = "white";
        ctx.font = "10px Arial";
        ctx.fillText(this.id, this.x - 5, this.y + 5);
    }

    actualizar() {
        if (this.x + this.r > this.canvas.width || this.x - this.r < 0) this.dx = -this.dx;
        if (this.y + this.r > this.canvas.height || this.y - this.r < 0) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
    }
}