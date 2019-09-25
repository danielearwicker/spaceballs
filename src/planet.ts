export const planetRadius = 50;

export function planet(ctx: CanvasRenderingContext2D) {

    ctx.beginPath();
    ctx.arc(0, 0, planetRadius, 0, Math.PI * 2);

    ctx.fillStyle = "#832";
    ctx.fill();
}
