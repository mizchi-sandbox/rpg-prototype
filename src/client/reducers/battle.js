/* @flow */
import type { BattleSagaAction } from '../actions/battleSagaActions'
import {
  REQUEST_START,
  RESTARTED,
  PAUSED,
  RESET
} from '../actions/battleActions'
import { SYNC } from '../actions/battleSagaActions'
import type { BattleAction } from '../actions/battleActions'
import type { BattleState } from 'domain/battle'

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
    case RESET:
      return initialState
    default:
      return state
  }
}
