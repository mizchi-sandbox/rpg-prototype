/* @flow */
// import { updateIn } from '../utils/arrayUtils'
import type { Actor } from '../entities/Actor'
import type { Resource } from '../entities/Resource'
import { adventureSessionMock0 } from '../__mocks/adventureSessionMock'
import * as ResourceActions from '../entities/Resource'

export type AdventureSession = {
  id: string,
  resources: Resource[],
  actors: Actor[]
}

export function load() {
  return adventureSessionMock0
}

export function addResources(
  session: AdventureSession,
  resources: Resource[]
): AdventureSession {
  return {
    ...session,
    resources: ResourceActions.mergeResources(session.resources, resources)
  }
}
