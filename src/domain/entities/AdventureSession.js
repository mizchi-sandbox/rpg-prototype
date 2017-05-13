/* @flow */
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
