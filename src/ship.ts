import { PolarCanvas } from "./PolarCanvas";

const shipRadius = 30;
const shipShape = Math.PI * (3/4);
const flameShape = Math.PI * (5/6);
const flameRadius = 40;

export function ship(canvas: PolarCanvas, flame: number) {
    canvas.ctx.beginPath();

    canvas.moveTo(0, shipRadius);
    canvas.lineTo(shipShape, shipRadius);
    canvas.lineTo(Math.PI, shipRadius/3);
    canvas.lineTo(-shipShape, shipRadius);
    canvas.lineTo(0, shipRadius);

    canvas.ctx.fillStyle = "#349";
    canvas.ctx.lineWidth = 2;
    canvas.ctx.fill();
    canvas.ctx.stroke();

    if (flame > 0) {
        canvas.ctx.beginPath();
        canvas.moveTo(Math.PI, shipRadius/2);
        canvas.lineTo(flameShape, flameRadius);
        canvas.lineTo(-flameShape, flameRadius);
        canvas.lineTo(Math.PI, shipRadius/2);

        canvas.ctx.globalAlpha = flame;
        canvas.ctx.fillStyle = "#db0";        
        canvas.ctx.fill();
    }
}
