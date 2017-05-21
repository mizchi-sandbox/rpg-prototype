/* @flow */
import * as PlayingSessionActions from '../actions/playingActions'
import type { PlayingAction } from '../actions/playingActions'
import type { PlayingSession } from 'domain/sessions/PlayingSession'

export type State = {
  playingSession: ?PlayingSession
}

const initialState: State = {
  playingSession: undefined
}

export default (state: State = initialState, action: PlayingAction) => {
  switch (action.type) {
    case PlayingSessionActions.PLAYING_SESSION_LOADED:
      return {
        ...state,
        playingSession: action.payload
      }
    default:
      return state
  }
}
