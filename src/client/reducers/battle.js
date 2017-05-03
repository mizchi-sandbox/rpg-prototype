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

export type Action =
  | ResetAction
  | AddInputToQueueAction

export type State = {
  battleState: ?BattleState,
  loading: boolean,
  active: boolean
}

const initialState: State = {
  loading: true,
  active: true,
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
    case RESET:
      return initialState
    case BattleSaga.SYNC:
      return {
        ...state,
        battleState: action.payload,
        loading: true
      }
    default:
      return state
  }
}
