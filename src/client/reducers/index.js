/* @flow */
import { combineReducers } from 'redux'
import battle from './battle'
import app from './app'
import type { State as BattleSession } from './battle'
import type { State as AppState } from './app'

export type State = {
  battle: BattleSession,
  app: AppState
}

export default combineReducers({
  app,
  battle
})
