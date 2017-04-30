/* @flow */
export const LOG = 'battle-mainloop:LOG'
export const EXIT = 'battle-mainloop:EXIT'
export const NOTHING = 'battle-mainloop:NOTHING'
export const READY_MAINLOOP = 'battle-mainloop:READY_MAINLOOP'
export const READY_FOR_INPUT = 'battle-mainloop:READY_FOR_INPUT'

export const readyMainloop = () => ({
  type: READY_MAINLOOP
})

export type Output =
| {
  type: typeof READY_MAINLOOP
}
| {
  type: typeof LOG,
  payload: {
    text: string
  }
} | {
  type: typeof EXIT
} | {
  type: typeof NOTHING
} | {
  type: typeof READY_FOR_INPUT
}
