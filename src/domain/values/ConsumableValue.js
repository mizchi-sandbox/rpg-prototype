/* @flow */
export type ConsumableValue = {
  val: number,
  max: number
}

export const add: (ConsumableValue, number) => ConsumableValue =
  (cv, n) => ({
    val: Math.min(cv.val + n, cv.max) | 0,
    max: cv.max
  })

export const consume: (ConsumableValue, number) => ConsumableValue =
  (cv, n) => ({
    val: Math.max(cv.val - n, 0) | 0,
    max: cv.max
  })

export const increment: ConsumableValue => ConsumableValue =
  cv => ({
    val: Math.min(cv.val + 1, cv.max) | 0,
    max: cv.max
  })

export const decrement: ConsumableValue => ConsumableValue =
  cv => ({
    val: Math.max(cv.val - 1, 0) | 0,
    max: cv.max
  })

export const create: number => ConsumableValue = (max) => ({
  val: max, max
})
