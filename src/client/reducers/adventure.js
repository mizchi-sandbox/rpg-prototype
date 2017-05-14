/* @flow */
import * as AdventureActions from '../actions/adventureActions'
import type { AdventureAction } from '../actions/adventureActions'
import type { AdventureSession } from 'domain/entities/AdventureSession'

export type State = {
  adventureSession: ?AdventureSession
}

const initialState: State = {
  adventureSession: undefined
}

export default (
  state: State = initialState,
  action: AdventureAction
) => {
  switch (action.type) {
    case AdventureActions.PLAYING_SESSION_LOADED:
      return {
        ...state,
        adventureSession: action.payload
      }
    default:
      return state
  }
}
