/* @flow */
import type { PlayingSession } from 'domain/sessions/PlayingSession'

export const REQUEST_TO_START_PLYAING_SESSION =
  'playingSession/REQUEST_TO_START_PLYAING_SESSION'
export const PLAYING_SESSION_LOADED = 'playingSession/PLAYING_SESSION_LOADED'

// TODO: Fix
export type PlayingAction = any
// | {
//     type: typeof REQUEST_TO_START_PLYAING_SESSION,
//     payload: {
//       savedataId: string
//     }
//   }
// | {
//     type: typeof PLAYING_SESSION_LOADED,
//     payload: PlayingSession
//   }

export function requestToStartPlayingSession(savedataId: string) {
  return {
    type: REQUEST_TO_START_PLYAING_SESSION,
    payload: { savedataId }
  }
}

export function loaded(payload: PlayingSession) {
  return {
    type: PLAYING_SESSION_LOADED,
    payload
  }
}
