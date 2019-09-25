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
                <div className="instructions">
                    Press Z to rotate your ship anti-clockwise, X for clockwise. Press M to fire your booster rocket.
                </div>
                <div className="link">
                    <a href="https://github.com/danielearwicker/spaceballs/">Source</a>
                </div>
            </div>
            <AnimationCanvas render={renderFrame}/>
        </div>
    );
}

const bigG = 2000;

interface Projectile {
    readonly position: Vector2D;
    readonly velocity: Vector2D;
}

const start: Projectile = {
    position: new Vector2D(400, 0),
    velocity: new Vector2D(0, -2)
};

let state = start;
let orientation = 0;
let flame = 0;
let trajectory: Vector2D[] = [];
let trajectoryClosed = false;

function integrate(projectile: Projectile, width: number, height: number): Projectile | undefined {
    const polarPosition = projectile.position.polar;

    if (polarPosition.radius < planetRadius || 
        (polarPosition.radius > width &&
         polarPosition.radius > height)) {

        return undefined;
    }

    const gravity = bigG / Math.pow(polarPosition.radius, 2);

    const velocity = projectile.velocity.add(new Polar2D(polarPosition.angle, -gravity).vector);
    const position = projectile.position.add(velocity);

    return { position, velocity };
}

function plotTrajectory(width: number, height: number) {

    trajectory.length = 0;
    trajectoryClosed = false;

    let s = state;
    let hasEmbarked = false;

    for (let n = 0; n < 10000; n++) {
        const next = integrate(s, width, height);
        if (!next) {
            break;
        }
        trajectory.push(next.position);
        s = next;

        const isEmbarked = s.position.subtract(state.position).polar.radius > 10;
        if (!isEmbarked && hasEmbarked) {
            trajectoryClosed = true;
            break;
        }
        hasEmbarked = isEmbarked;
    }
}

function renderFrame(ctx: CanvasRenderingContext2D) {

    const polarCanvas = new PolarCanvas(ctx);

    const w = ctx.canvas.width, h = ctx.canvas.height;
    
    ctx.clearRect(0, 0, w, h);
    
    ctx.save();
    ctx.strokeStyle = "white";
    
    ctx.translate(w / 2, h / 2);

    plotTrajectory(w, h);
    
    if (trajectory.length) {
        ctx.strokeStyle = "gray";
        ctx.beginPath();
        ctx.moveTo(trajectory[0].x, trajectory[0].y);
        trajectory.forEach(t => { ctx.lineTo(t.x, t.y); });
        if (trajectoryClosed) {
            ctx.lineTo(trajectory[0].x, trajectory[0].y);
        }
        ctx.stroke();
        ctx.strokeStyle = "white";
    }

    planet(ctx);

    ctx.save();
    ctx.translate(state.position.x, state.position.y);
    ctx.rotate(orientation);

    ship(polarCanvas, flame);

    ctx.restore();

    if (isKeyDown("z")) {
        orientation -= 0.05;
    } else if (isKeyDown("x")) {
        orientation += 0.05;
    }

    if (isKeyDown("m")) {
        state = { 
            ...state,
            velocity: state.velocity.add(new Polar2D(orientation, 0.02).vector)
        }
        flame = 1;
    } else {
        if (flame > 0) flame -= 0.1;
    }

    state = integrate(state, w, h) || start;    
}
