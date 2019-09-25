import { Vector2D } from "./Vector2D";

export class Polar2D {

    constructor(public readonly angle: number, 
                public readonly radius: number) { }

    get vector() {
        return new Vector2D(Math.cos(this.angle) * this.radius,
                            Math.sin(this.angle) * this.radius);
    }

    multiply(scalar: number) {
        return new Polar2D(this.angle, this.radius * scalar);
    }

    rotate(angle: number) {
        return new Polar2D(this.angle + angle, this.radius);
    }
}
