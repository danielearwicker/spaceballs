import { AnimationCanvas } from "./AnimationCanvas";
import { PolarCanvas } from "./PolarCanvas";
import { ship } from "./ship";
import { planet, planetRadius } from "./planet";
import { isKeyDown } from "./keyboard";

import React from "react";
import { Polar2D } from "./Polar2D";
import { Vector2D } from "./Vector2D";

export function App() {

    return (
        <div className="app">
            <div className="caption">
                Press Z to rotate your ship anti-clockwise, X for clockwise. Press M to fire your booster rocket.
            </div>
            <AnimationCanvas render={renderFrame}/>
        </div>
    );
}

const bigG = 2000;

const initialPosition = new Vector2D(400, 0);
const initialVelocity = new Vector2D(0, -2);

let position = initialPosition;
let velocity = initialVelocity;
let orientation = 0;
let flame = 0;

function renderFrame(ctx: CanvasRenderingContext2D) {

    const polarCanvas = new PolarCanvas(ctx);

    const w = ctx.canvas.width, h = ctx.canvas.height;
    
    ctx.clearRect(0, 0, w, h);
    
    ctx.save();
    ctx.strokeStyle = "white";
    
    ctx.translate(w / 2, h / 2);
    
    planet(ctx);

    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate(orientation);

    ship(polarCanvas, flame);

    ctx.restore();

    if (isKeyDown("z")) {
        orientation -= 0.05;
    } else if (isKeyDown("x")) {
        orientation += 0.05;
    }

    const polarPosition = position.polar;

    if (polarPosition.radius < planetRadius || 
        (polarPosition.radius > w &&
         polarPosition.radius > h)) {

        // either crashed or lost in space, so reset
        position = initialPosition;
        velocity = initialVelocity;
    }

    const gravity = bigG / Math.pow(polarPosition.radius, 2);

    velocity = velocity.add(new Polar2D(polarPosition.angle, -gravity).vector);

    if (isKeyDown("m")) {
        velocity = velocity.add(new Polar2D(orientation, 0.2).vector);
        flame = 1;
    } else {
        if (flame > 0) flame -= 0.1;
    }
    
    position = position.add(velocity);
}
