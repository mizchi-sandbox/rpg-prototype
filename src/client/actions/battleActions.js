/* @flow */

// Constants
export const REQUEST_START = 'battle:request-start'
export const REQUEST_PAUSE = 'battle:request-pause'
export const REQUEST_RESTART = 'battle:request-restart'
export const PAUSED = 'battle:paused'
export const RESTARTED = 'battle:restarted'
export const ADD_INPUT_TO_QUEUE = 'battle:add-input-to-queue'
export const RESET = 'battle:reset'

// Actions
export type BattleAction =
  | { type: typeof REQUEST_START }
  | { type: typeof REQUEST_PAUSE }
  | { type: typeof REQUEST_RESTART }
  | { type: typeof PAUSED }
  | { type: typeof RESTARTED }
  | { type: typeof RESET }
  | {
      type: typeof ADD_INPUT_TO_QUEUE,
      payload: {
        battlerId: Symbol,
        skillId: Symbol
      }
    }

// action creator
export const requestStart = () => ({ type: REQUEST_START })
export const requestPause = () => ({ type: REQUEST_PAUSE })
export const requestRestart = () => ({ type: REQUEST_RESTART })
export const paused = () => ({ type: PAUSED })
export const restarted = () => ({ type: RESTARTED })
export const reset = () => ({ type: RESET })
export const addInputToQueue = (
  battlerId: Symbol,
  skillId: Symbol
): BattleAction => {
  return {
    type: ADD_INPUT_TO_QUEUE,
    payload: {
      battlerId,
      skillId
    }
  }
}
