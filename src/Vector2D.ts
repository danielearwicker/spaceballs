import { Polar2D } from "./Polar2D";

export class Vector2D {

    constructor(public readonly x: number, 
                public readonly y: number) { }

    add(other: Vector2D) {
        return new Vector2D(this.x + other.x, this.y + other.y);
    }

    subtract(other: Vector2D) {
        return new Vector2D(this.x - other.x, this.y - other.y);
    }

    get polar() {
        return new Polar2D(Math.atan2(this.y, this.x),
                           Math.sqrt((this.x * this.x) + (this.y * this.y)));
    }
}
