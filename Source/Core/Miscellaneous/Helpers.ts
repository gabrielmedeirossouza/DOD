export type Class<T> = new (...args: any[]) => T

export function removeUndefined<T extends Record<string, any>>(obj: T): T {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined)
    ) as T
}
