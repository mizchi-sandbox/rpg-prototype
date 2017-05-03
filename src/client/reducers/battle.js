/* @flow */
import * as BattleSaga from '../sagas/battleSaga'
import type { BattleState } from '../../domain/battle'
import type { SyncAction } from '../sagas/battleSaga'

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
export const pauseRequest = (): StartRequestAction => ({ type: PAUSE_REQUEST })
export const paused = (): StartRequestAction => ({ type: PAUSED })
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
export type Action =
  | ResetAction
  | StartRequestAction
  | PauseRequestAction
  | PausedAction
  | RestartRequestAction
  | RestartedAction
  | AddInputToQueueAction

// State
export type State = {
  battleState: ?BattleState,
  loading: boolean,
  paused: boolean
}

const initialState: State = {
  loading: true,
  paused: false,
  battleState: null
}

// Reducer
export default (
  state: State = initialState,
  action: Action | SyncAction
) => {
  switch (action.type) {
    case START_REQUEST:
      return {
        ...state,
        battleState: null,
        loading: false
      }
    case PAUSED:
      return {
        ...state,
        paused: true
      }
    case RESTARTED:
      return {
        ...state,
        paused: false
      }
    case BattleSaga.SYNC:
      return {
        ...state,
        battleState: action.payload,
        loading: true
      }
    case RESET:
      return initialState
    default:
      return state
  }
}
