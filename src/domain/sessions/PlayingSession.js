/* @flow */
import uuid from 'uuid'
import type { Resource } from 'domain/entities/Resource'
import * as SavedataActions from 'domain/entities/Savedata'
import * as ResourceActions from 'domain/entities/Resource'

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

export function collectResources(
  session: PlayingSession,
  resources: Resource[]
): PlayingSession {
  return {
    ...session,
    resources: ResourceActions.mergeResources(session.resources, resources)
  }
}
