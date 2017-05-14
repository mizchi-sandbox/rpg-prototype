/* @flow */
import { combineReducers } from 'redux'
import battle from './battle'
import app from './app'
import adventure from './adventure'
import playing from './playing'
import type { State as BattleSession } from './battle'
import type { State as AppState } from './app'
import type { State as Adventure } from './adventure'
import type { State as PlayingState } from './playing'

export type State = {
  battle: BattleSession,
  app: AppState,
  playing: PlayingState,
  adventure: Adventure
}

export default combineReducers({
  app,
  battle,
  playing,
  adventure
})
