/* @flow */
import {
  PAUSED,
  REQUEST_START,
  RESET,
  RESTARTED,
  UPDATE_INPUT_QUEUE,
  OPEN_RESULT,
  CLOSE_RESULT
} from '../../actions/battleActions'
import type { BattleSagaAction } from '../../actions/battleSagaActions'
import { SYNC } from '../../actions/battleSagaActions'
import type { BattleAction } from '../../actions/battleActions'
import type { BattleSession, Input, BattleResult } from 'domain/battle'

// State
export type State = {
  battleState: ?BattleSession,
  inputQueue: Input[],
  loading: boolean,
  paused: boolean,
  battleCommandResult: ?BattleResult
}

const initialState: State = {
  loading: true,
  paused: false,
  battleState: null,
  inputQueue: [],
  battleCommandResult: null
}

// Reducer
export default (
  state: State = initialState,
  action: BattleAction | BattleSagaAction
) => {
  switch (action.type) {
    case REQUEST_START:
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
    case SYNC:
      return {
        ...state,
        battleState: action.payload,
        loading: true
      }
    case OPEN_RESULT:
      return {
        ...state,
        battleCommandResult: action.payload
      }
    case CLOSE_RESULT:
      return {
        ...state,
        battleCommandResult: null
      }
    case UPDATE_INPUT_QUEUE:
      return {
        ...state,
        inputQueue: action.payload.inputQueue
      }
    case RESET:
      return initialState
    default:
      return state
  }
}
