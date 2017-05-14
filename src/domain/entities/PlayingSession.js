/* @flow */
import { playingSessionMock0 } from './__mocks/playingSessionMock'
import type { Resource } from './Resource'

export type PlayingSession = {
  id: string,
  resources: Resource[]
}

export function load() {
  return playingSessionMock0
}
