/* @flow */
import * as BattleSaga from '../sagas/battleSaga'
import type { BattleState } from '../../domain/battle'
import type { SyncAction } from '../sagas/battleSaga'
import {
  REQUEST_START,
  RESTARTED,
  PAUSED,
  RESET
} from '../actions/battleActions'
import type { BattleAction } from '../actions/battleActions'

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
  action: BattleAction | SyncAction
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
