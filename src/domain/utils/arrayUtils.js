/* @flow */

export function pickRandom<T>(arr: T[]): T {
  return arr[~~(Math.random() * arr.length)]
}

export function updateIn<T>(
  arr: T[],
  matcher: T => boolean,
  replacer: T => T
): T[] {
  return arr.map(b => (matcher(b) ? replacer(b) : b))
}
