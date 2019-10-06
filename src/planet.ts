import { Vector2D } from "./Vector2D";

export class Planet {

    constructor(
        public readonly position: Vector2D,
        public readonly mass: number) { }

    get radius() {
        return this.mass * 10;
    }

    render(ctx: CanvasRenderingContext2D) {

        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    
        ctx.fillStyle = "#832";
        ctx.fill();
    }
}
