/* @flow */
import type { AdventureSession } from 'domain/entities/AdventureSession'

export const REQUEST_LOAD_PLAYING_SESSION = 'playingSession/request-loading'
export const PLAYING_SESSION_LOADED = 'playingSession/loaded'
export type AdventureSessionAction =
  | {
      type: typeof REQUEST_LOAD_PLAYING_SESSION
    }
  | {
      type: typeof PLAYING_SESSION_LOADED,
      payload: AdventureSession
    }

export function requestLoadAdventureSession() {
  return {
    type: REQUEST_LOAD_PLAYING_SESSION
  }
}

export function loadedAdventureSession(payload: AdventureSession) {
  return {
    type: PLAYING_SESSION_LOADED,
    payload
  }
}
