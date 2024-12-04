/*
 ****************** 
 * isEmpty
 * isNumber
 * 
 *******************
*/

export const isEmpty = (value: any): boolean => {
    if (
        typeof value === "undefined" ||
        value === null ||
        value === "" ||
        value === "null" ||
        value.length === 0 ||
        (typeof value === "object" && !Object.keys(value).length)
    ) { return true } else { return false }
}

export const isNumber = (value: any) => {
    return typeof Number(value) === 'number' && !isNaN(value)
}