/* @flow */
export type ConsumableValue = {|
  val: number,
  max: number
|}

export const set: (ConsumableValue, number) => ConsumableValue = (cv, n) =>
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

export const add: (ConsumableValue, number) => ConsumableValue = (cv, n) =>
  Object.freeze({
    val: Math.min(cv.val + n, cv.max) | 0,
    max: cv.max
  })

export const sub: (ConsumableValue, number) => ConsumableValue = (cv, n) =>
  Object.freeze({
    val: Math.max(cv.val - n, 0) | 0,
    max: cv.max
  })

export const increment: ConsumableValue => ConsumableValue = cv =>
  Object.freeze({
    val: Math.min(cv.val + 1, cv.max) | 0,
    max: cv.max
  })

export const decrement: ConsumableValue => ConsumableValue = cv =>
  Object.freeze({
    val: Math.max(cv.val - 1, 0) | 0,
    max: cv.max
  })

export const create: number => ConsumableValue = max =>
  Object.freeze({
    val: max,
    max
  })
