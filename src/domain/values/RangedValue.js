/* @flow */
export type RangedValue = {|
  val: number, // int
  max: number
|}

export const set: (RangedValue, number) => RangedValue = (cv, n) =>
  Object.freeze({
    val: (() => {
      if (n > cv.max) {
        return cv.max
      } else if (n < 0) {
        return 0
      } else {
        return n
      }
    })() | 0,
    max: cv.max
  })

export const add: (RangedValue, number) => RangedValue = (cv, n) =>
  Object.freeze({
    val: Math.min(cv.val + n, cv.max) | 0,
    max: cv.max
  })

export const sub: (RangedValue, number) => RangedValue = (cv, n) =>
  Object.freeze({
    val: Math.max(cv.val - n, 0) | 0,
    max: cv.max
  })

export const increment: RangedValue => RangedValue = cv =>
  Object.freeze({
    val: Math.min(cv.val + 1, cv.max) | 0,
    max: cv.max
  })

export const decrement: RangedValue => RangedValue = cv =>
  Object.freeze({
    val: Math.max(cv.val - 1, 0) | 0,
    max: cv.max
  })

export const create: number => RangedValue = max =>
  Object.freeze({
    val: max,
    max
  })
