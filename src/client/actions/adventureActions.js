/* @flow */
import type { AdventureSession } from 'domain/adventure/AdventureSession'
import type { AdventureResult } from 'domain/adventure/AdventureResult'
import type { Resource } from 'domain/entities/Resource'

export const REQUEST_ADD_RESOURCES = 'adventure/request-add-resource'
export const REQUEST_START_ADVENTURE = 'adventure/request-loading'
export const REQUEST_EXIT = 'adventure/request-exit'
export const PLAYING_SESSION_LOADED = 'adventure/loaded'
export const ADD_LOG = 'adventure/add-log'
export const EXIT = 'adventure/exit'

export type AdventureAction =
  | {
      type: typeof REQUEST_START_ADVENTURE
    }
  | {
      type: typeof REQUEST_EXIT,
      payload: AdventureResult
    }
  | {
      type: typeof EXIT
    }
  | {
      type: typeof ADD_LOG,
      payload: string
    }
  | {
      type: typeof PLAYING_SESSION_LOADED,
      payload: AdventureSession
    }
  | {
      type: typeof REQUEST_ADD_RESOURCES,
      payload: {
        resources: Resource[]
      }
    }

export function requestLoadAdventureSession(): AdventureAction {
  return {
    type: REQUEST_START_ADVENTURE
  }
}

export function exit(): AdventureAction {
  return {
    type: EXIT
  }
}

export function requestExit(result: AdventureResult): AdventureAction {
  return {
    type: REQUEST_EXIT,
    payload: result
  }
}

// TODO
export function requestAddResources(resources: Resource[]): AdventureAction {
  return {
    type: REQUEST_ADD_RESOURCES,
    payload: { resources }
  }
}

export function sync(payload: AdventureSession) {
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
