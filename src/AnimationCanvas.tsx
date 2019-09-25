import { required } from "./util";
import { useEffect } from "react";

import React from "react";

export interface AnimationCanvasProps {
    className?: string;
    render(ctx: CanvasRenderingContext2D): void;
}

let instanceCounter = 0;

export function AnimationCanvas({ className, render }: AnimationCanvasProps) {

    let container: HTMLDivElement | null = null;

    useEffect(() => {
        if (!container) return;
        
        const canvas = required(container.querySelector("canvas"));
        const ctx = required(canvas.getContext("2d"));
        const dpr = window.devicePixelRatio || 1;
        const currentInstanceId = ++instanceCounter;        

        function resizeCanvas() {
            if (!container) return;

            const w = container.clientWidth, 
                  h = container.clientHeight - 1;

            if (canvas.width !== w) canvas.width = w * dpr;
            if (canvas.height !== h) canvas.height = h * dpr;

            const ws = `${w}px`, hs = `${h}px`;
            if (canvas.style.width !== ws) canvas.style.width = ws;
            if (canvas.style.height !== hs) canvas.style.height = hs;
        }

        function animationLoop() {
            if (instanceCounter !== currentInstanceId) return;

            requestAnimationFrame(() => {
                resizeCanvas();
                render(ctx);
                animationLoop();
            });
        }
    
        animationLoop();

        return () => { instanceCounter++; };
    });

    return (
        <div className={className || "animation-canvas"} 
             style={{overflow: "hidden"}}
             ref={e => container = e}>
            <canvas/>
        </div>
    );
}

