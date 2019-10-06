
let touches: Touch[] = [];

function saveTouches(ev: TouchEvent) {
    ev.preventDefault();        
    ev.stopPropagation();        
    touches = Array.from(ev.touches);
}

for (const event of ["touchstart", "touchend", "touchmove"] as const) {
    document.addEventListener(event, saveTouches, { passive: false });
}

export function getSingleTouch() {
    return touches.length ? { x: touches[0].pageX, y: touches[0].pageY } : undefined; 
}
