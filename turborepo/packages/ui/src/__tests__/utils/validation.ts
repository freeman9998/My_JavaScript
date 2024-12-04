import { isEmpty, isNumber } from "../../utils"

describe('Validation Check', () => {
  it('target : isEmpty util', () => {
    // string
    expect(isEmpty('something')).toBe(false)
    expect(isEmpty('')).toBe(true)
    // array
    expect(isEmpty(['array'])).toBe(false)
    expect(isEmpty([])).toBe(true)
    // object
    expect(isEmpty({})).toBe(true)
    expect(isEmpty({'':''})).toBe(false)
    // any
    expect(isEmpty(0)).toBe(false)
    expect(isEmpty(['',0])).toBe(false)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty(null)).toBe(true)
  })

  it('target : isNumber util', () => {
    // string
    expect(isNumber('something')).toBe(false)
  })
})
