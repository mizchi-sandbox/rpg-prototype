/* @flow */
import uuid from 'uuid'
import type { Resource } from './Resource'
import * as SavedataActions from './Savedata'

export type PlayingSession = {
  id: string,
  savedataId: string,
  resources: Resource[]
}

// TODO: Mocked
export function loadBySavedataId(savedataId: string): PlayingSession {
  const savedata = SavedataActions.load(savedataId)
  return {
    id: uuid(),
    savedataId: savedata.id,
    playerName: savedata.playerName,
    resources: savedata.resources
  }
}
