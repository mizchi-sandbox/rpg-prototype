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
import type { BattleSession, Input, BattleSessionResult } from 'domain/battle'

// State
export type State = {
  battleState: ?BattleSession,
  inputQueue: Input[],
  loading: boolean,
  paused: boolean,
  battleCommandResult: ?BattleSessionResult
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
  session: State = initialState,
  action: BattleAction | BattleSagaAction
) => {
  switch (action.type) {
    case REQUEST_START:
      return {
        ...session,
        battleState: null,
        loading: false
      }
    case PAUSED:
      return {
        ...session,
        paused: true
      }
    case RESTARTED:
      return {
        ...session,
        paused: false
      }
    case SYNC:
      return {
        ...session,
        battleState: action.payload,
        loading: true
      }
    case OPEN_RESULT:
      return {
        ...session,
        battleCommandResult: action.payload
      }
    case CLOSE_RESULT:
      return {
        ...session,
        battleCommandResult: null
      }
    case UPDATE_INPUT_QUEUE:
      return {
        ...session,
        inputQueue: action.payload.inputQueue
      }
    case RESET:
      return initialState
    default:
      return session
  }
}
