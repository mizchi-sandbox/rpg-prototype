/* @flow */
import type { PlayingSession } from 'domain/entities/PlayingSession'

export const REQUEST_LOAD_PLAYING_SESSION = 'playingSession/request-loading'
export const PLAYING_SESSION_LOADED = 'playingSession/loaded'
export type PlayingSessionAction =
  | {
      type: typeof REQUEST_LOAD_PLAYING_SESSION
    }
  | {
      type: typeof PLAYING_SESSION_LOADED,
      payload: PlayingSession
    }

export function requestLoadPlayingSession() {
  return {
    type: REQUEST_LOAD_PLAYING_SESSION
  }
}

export function loadedPlayingSession(payload: PlayingSession) {
  return {
    type: PLAYING_SESSION_LOADED,
    payload
  }
}
