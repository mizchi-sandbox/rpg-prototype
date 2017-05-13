/* @flow */
import { combineReducers } from 'redux'
import battle from './battle'
import app from './app'
import adventureSession from './adventureSession'
import type { State as BattleSession } from './battle'
import type { State as AppState } from './app'
import type { State as AdventureSession } from './adventureSession'

export type State = {
  battle: BattleSession,
  app: AppState,
  adventureSession: AdventureSession
}

export default combineReducers({
  app,
  battle,
  adventureSession
})
