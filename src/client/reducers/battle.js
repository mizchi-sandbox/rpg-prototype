/* @flow */
import type { BattleState } from 'core/lib/battle'

// Start
export const START = 'battle:start'
export const START_REQUEST = 'battle:start:request'
export type StartRequestAction = {
  type: typeof START_REQUEST
}
export type StartAction = {
  type: typeof START,
  payload: BattleState
}
export const startRequest = (): StartRequestAction => {
  return {
    type: START_REQUEST
  }
}

// Tick
export const TICK = 'battle:tick'
export const TICK_REQUEST = 'battle:tick:request'
export type TickRequestAction = {
  type: typeof TICK_REQUEST
}
export type TickAction = {
  type: typeof TICK,
  payload: BattleState
}
export const tickRequest = (): TickRequestAction => {
  return {
    type: TICK_REQUEST
  }
}

// Reset
export const RESET = 'battle:reset'
export type ResetAction = {
  type: typeof RESET
}

export type Action =
  | TickAction
  | TickRequestAction
  | StartRequestAction
  | StartAction
  | ResetAction

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
  action: Action
) => {
  switch (action.type) {
    case START_REQUEST:
      return {
        ...state,
        battleState: null,
        loading: false
      }
    case START:
      return {
        ...state,
        battleState: action.payload,
        loading: false
      }
    case TICK_REQUEST:
      return {
        ...state,
        loading: true
      }
    case TICK:
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
