/* @flow */
import { updateIn } from '../utils/arrayUtils'
import type { Actor } from './Actor'
import type { Resource } from './Resource'
import { adventureSessionMock0 } from './__mocks/adventureSessionMock'

export type AdventureSession = {
  id: string,
  resources: Resource[],
  actors: Actor[]
}

export function load() {
  return adventureSessionMock0
}

export function addResource(
  session: AdventureSession,
  res: Resource
): AdventureSession {
  const existedResource = session.resources.find(
    r => r.resourceId === res.resourceId
  )

  if (existedResource) {
    return {
      ...session,
      resources: updateIn(
        session.resources,
        r => r.resourceId === res.resourceId,
        r => Object.assign({ ...r, amount: r.amount + res.amount })
      )
    }
  } else {
    return { ...session, resources: session.resources.concat([res]) }
  }
}

export function addResources(
  session: AdventureSession,
  resources: Resource[]
): AdventureSession {
  return resources.reduce((acc, res) => addResource(acc, res), session)
}
