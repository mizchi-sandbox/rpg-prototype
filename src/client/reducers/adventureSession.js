/* @flow */
import * as AdventureSessionActions from '../actions/adventureSessionActions'
import type { AdventureSessionAction } from '../actions/adventureSessionActions'
import type { AdventureSession } from 'domain/entities/AdventureSession'

export type State = {
  adventureSession: ?AdventureSession
}

const initialState: State = {
  adventureSession: undefined
}

export default (state: State = initialState, action: AdventureSessionAction) => {
  switch (action.type) {
    case AdventureSessionActions.PLAYING_SESSION_LOADED:
      return {
        ...state,
        adventureSession: action.payload
      }
    default:
      return state
  }
}
