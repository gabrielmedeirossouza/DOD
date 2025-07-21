export type ValidationError =
    {
        entity: string
        code: string
        message: string
    }
    &
    {
        [key: string]: any
    }

export function validationError(entity: string, code: Lowercase<string>, message: string, details?: Record<string, any>): ValidationError {
    return {
        entity,
        code,
        message,
        ...details
    }
}
