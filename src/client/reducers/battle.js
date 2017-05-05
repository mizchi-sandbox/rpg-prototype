/* @flow */
import {
  REQUEST_START,
  RESTARTED,
  UPDATE_INPUT_QUEUE,
  PAUSED,
  LOG,
  RESET
} from '../actions/battleActions'
import type { BattleSagaAction } from '../actions/battleSagaActions'
import { SYNC } from '../actions/battleSagaActions'
import type { BattleAction } from '../actions/battleActions'
import type { BattleState, Input } from 'domain/battle'

// State
export type State = {
  battleState: ?BattleState,
  inputQueue: Input[],
  loading: boolean,
  log: string[],
  paused: boolean
}

const initialState: State = {
  loading: true,
  paused: false,
  battleState: null,
  log: [],
  inputQueue: []
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
    case UPDATE_INPUT_QUEUE:
      return {
        ...state,
        inputQueue: action.payload.inputQueue
      }
    case LOG:
      return {
        ...state,
        log: state.log.length < 5
          ? [].concat([action.payload], state.log)
          : [].concat([action.payload], state.log.slice(0, -1))
      }
    case RESET:
      return initialState
    default:
      return state
  }
}
