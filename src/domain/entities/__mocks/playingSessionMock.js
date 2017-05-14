/* @flow */
import uuid from 'uuid'
import type { PlayingSession } from '../PlayingSession'
import { resourcesMock0 } from './resourceMock'

export const playingSessionMock0: PlayingSession = {
  id: uuid(),
  savedataId: uuid(),
  playerName: 'Player1$playingSessionMock',
  resources: resourcesMock0
}
