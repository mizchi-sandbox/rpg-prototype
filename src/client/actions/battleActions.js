/* @flow */

// Start
export const START_REQUEST = 'battle:start:request'
export type StartRequestAction = {
  type: typeof START_REQUEST
}
export const startRequest = (): StartRequestAction => {
  return {
    type: START_REQUEST
  }
}

// Pause
export const PAUSE_REQUEST = 'battle:pause:request'
export const PAUSED = 'battle:paused'
export const pauseRequest = () => ({ type: PAUSE_REQUEST })
export const paused = () => ({ type: PAUSED })
export type PauseRequestAction = { type: typeof PAUSE_REQUEST }
export type PausedAction = { type: typeof PAUSED }

// Restart
export const RESTART_REQUEST = 'battle:start-request'
export const RESTARTED = 'battle:restarted'
export type RestartRequestAction = { type: typeof RESTART_REQUEST }
export type RestartedAction = { type: typeof RESTART_REQUEST }
export const restartRequest = () => ({ type: RESTART_REQUEST })
export const restarted = () => ({ type: RESTARTED })

// Add input
export const ADD_INPUT_TO_QUEUE = 'battle:add-action-to-queue'
export type AddInputToQueueAction = {
  type: typeof ADD_INPUT_TO_QUEUE,
  payload: {
    battlerId: string,
    skillId: string
  }
}

export const addInputToQueue = (battlerId: string, skillId: string): AddInputToQueueAction => {
  return {
    type: ADD_INPUT_TO_QUEUE,
    payload: {
      battlerId, skillId
    }
  }
}

// Reset
export const RESET = 'battle:reset'
export type ResetAction = {
  type: typeof RESET
}

// Bundled
export type BattleAction =
  | ResetAction
  | StartRequestAction
  | PauseRequestAction
  | PausedAction
  | RestartRequestAction
  | RestartedAction
  | AddInputToQueueAction
