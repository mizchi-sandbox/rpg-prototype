/* @flow */
import type { AdventureSession } from 'domain/entities/AdventureSession'

export const REQUEST_LOAD_PLAYING_SESSION = 'playingSession/request-loading'
export const PLAYING_SESSION_LOADED = 'playingSession/loaded'
export const ADD_LOG = 'playingSession/add-log'
export type AdventureAction =
  | {
      type: typeof REQUEST_LOAD_PLAYING_SESSION
    }
  | {
      type: typeof ADD_LOG,
      payload: string
    }
  | {
      type: typeof PLAYING_SESSION_LOADED,
      payload: AdventureSession
    }

export function requestLoadAdventureSession(): AdventureAction {
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

export function addLog(message: string): AdventureAction {
  return {
    type: ADD_LOG,
    payload: message
  }
}
