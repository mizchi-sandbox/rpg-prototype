/* @flow */
import { combineReducers } from 'redux'
import battle from './battle'
import app from './app'
import playingSession from './playingSession'
import type { State as BattleSession } from './battle'
import type { State as AppState } from './app'
import type { State as PlayingSession } from './playingSession'

export type State = {
  battle: BattleSession,
  app: AppState,
  playingSession: PlayingSession
}

export default combineReducers({
  app,
  battle,
  playingSession
})
