/* @flow */
import type { Actor } from './Actor'
import type { Resource } from './Resource'
import { playingSessionMock0 } from './__mocks/playSessionMock'

export type PlayingSession = {
  id: string,
  resources: Resource[],
  actors: Actor[]
}

export function load() {
  return playingSessionMock0
}
