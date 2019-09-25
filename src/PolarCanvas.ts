import { Polar2D } from "./Polar2D";

export class PolarCanvas {

    constructor(public readonly ctx: CanvasRenderingContext2D) { }

    moveTo(angle: number, radius: number) {
        const v = new Polar2D(angle, radius).vector;
        this.ctx.moveTo(v.x, v.y);
    }

    lineTo(angle: number, radius: number) {
        const v = new Polar2D(angle, radius).vector;
        this.ctx.lineTo(v.x, v.y);
    }
}
