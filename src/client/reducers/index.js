/* @flow */
import { combineReducers } from 'redux'
import battle from './battle'
import app from './app'
import adventure from './adventure'
import playing from './playing'
import setup from './setup'
import type { State as BattleSession } from './battle'
import type { State as AppState } from './app'
import type { State as AdventureState } from './adventure'
import type { State as PlayingState } from './playing'
import type { State as SetupState } from './setup'

export type State = {
  battle: BattleSession,
  app: AppState,
  playing: PlayingState,
  adventure: AdventureState,
  setup: SetupState
}

export default combineReducers({
  app,
  battle,
  playing,
  adventure,
  setup
})
