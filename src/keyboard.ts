const keysDown: { [key: string]: boolean } = {};

document.addEventListener("keydown", e => keysDown[e.key] = true);
document.addEventListener("keyup", e => keysDown[e.key] = false);

export function isKeyDown(key: string) {
    return !!keysDown[key];
}
