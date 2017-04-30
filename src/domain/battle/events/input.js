/* @flow */
export const INIT_MAINLOOP = 'battle-mainloop/INIT_MAINLOOP'
export const PROCESS_TURN = 'battle-mainloop/PROCESS_TURN'
export const RECEIVE_SELECTED_SKILL = 'battle-mainloop/RECEIVE_SELECTED_SKILL'

export const initMainloop = () => ({ type: INIT_MAINLOOP })
export const processTurn = () => ({ type: PROCESS_TURN })

export type Input =
| {
  type: typeof INIT_MAINLOOP
}
| {
  type: typeof PROCESS_TURN
}
| {
  type: typeof RECEIVE_SELECTED_SKILL
}
