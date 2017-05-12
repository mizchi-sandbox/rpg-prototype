/* @flow */
import * as PlayingSessionActions from '../actions/playingSessionActions'
import type { PlayingSessionAction } from '../actions/playingSessionActions'
import type { PlayingSession } from 'domain/entities/PlayingSession'

export type State = {
  playingSession: ?PlayingSession
}

const initialState: State = {
  playingSession: undefined
}

export default (state: State = initialState, action: PlayingSessionAction) => {
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
