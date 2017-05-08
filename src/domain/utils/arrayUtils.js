/* @flow */

export function pickRandom<T>(arr: T[]): T {
  return arr[~~(Math.random() * arr.length)]
}
