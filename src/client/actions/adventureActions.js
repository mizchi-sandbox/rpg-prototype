/* @flow */
import type { AdventureSession } from 'domain/entities/AdventureSession'
import type { Resource } from 'domain/entities/Resource'

export const REQUEST_ADD_RESOURCES = 'adventure/request-add-resource'
export const REQUEST_LOAD_PLAYING_SESSION = 'adventure/request-loading'
export const REQUEST_EXIT = 'adventure/request-exit'
export const PLAYING_SESSION_LOADED = 'adventure/loaded'
export const ADD_LOG = 'adventure/add-log'
export const EXIT = 'adventure/exit'

// TODO: create file
type AdventureSessionResult = {
  type: {
    resources: Resource[]
  }
}
// ============

export type AdventureAction =
  | {
      type: typeof REQUEST_LOAD_PLAYING_SESSION
    }
  | {
      type: typeof REQUEST_EXIT
    }
  | {
      type: typeof EXIT,
      payload: AdventureSessionResult
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
    type: REQUEST_LOAD_PLAYING_SESSION
  }
}

export function requestExit(): AdventureAction {
  return {
    type: REQUEST_EXIT
  }
}

export function exit(
  adventureSessionResult: AdventureSessionResult
): AdventureAction {
  return {
    type: EXIT,
    payload: adventureSessionResult
  }
}

// TODO
export function requestAddResources(resources: Resource[]): AdventureAction {
  return {
    type: REQUEST_ADD_RESOURCES,
    payload: { resources }
  }
}

export function loadedAdventureSession(payload: AdventureSession) {
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
