/* @flow */
import { combineReducers } from 'redux'
import playing from './playing'
import battle from './battle'
import type { State as BattleState } from './battle'
import type { State as PlayingState } from './playing'

export type State = {
  battle: BattleState,
  playing: PlayingState
}

export default combineReducers({
  battle,
  playing
})
