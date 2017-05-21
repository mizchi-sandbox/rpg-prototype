/* @flow */
import * as AdventureActions from '../actions/adventureActions'
import type { AdventureAction } from '../actions/adventureActions'
import type { AdventureSession } from 'domain/sessions/AdventureSession'

export type State = {
  adventureSession: ?AdventureSession,
  log: string[]
}

const initialState: State = {
  adventureSession: undefined,
  log: []
}

export default (state: State = initialState, action: AdventureAction) => {
  switch (action.type) {
    case AdventureActions.PLAYING_SESSION_LOADED:
      return {
        ...state,
        adventureSession: action.payload
      }
    case AdventureActions.ADD_LOG:
      return {
        ...state,
        log: [action.payload].concat(state.log).slice(0, 4)
      }
    default:
      return state
  }
}
