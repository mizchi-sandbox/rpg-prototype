/* @flow */
import { combineReducers } from 'redux'
import runner from './runner'
import log from './log'

import type { State as RunnerState } from './runner'
import type { State as LogState } from './log'

export type State = {
  runner: RunnerState,
  log: LogState
}

export default combineReducers({
  runner,
  log
})
