export function getKeys<T>(p: Record<keyof T, 1>): { [P in keyof T]-?: P } {
    for (const k in p) {
        p[k] = k as any;
    }
    return p as any;
}
