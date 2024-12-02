export const isEmpty = (value: any): boolean => {
    if (typeof value === 'string' || value instanceof String) {
        return value.trim().length === 0
    } else if (Array.isArray(value)) {
        return value.length === 0
    } else if (value && typeof value === 'object' && Object.keys(value).length === 0) {
        return true
    } else {
        return !value
    }
}

export const isFunction = (params: any) => {
    return typeof params === 'function'
}

export const isNumber = (value: any) => {
    return typeof Number(value) === 'number' && !isNaN(value)
}