export function required<T>(ref: T | undefined | null) {    
    if (!ref) throw new Error("Something terribly wrong");
    return ref;
}
