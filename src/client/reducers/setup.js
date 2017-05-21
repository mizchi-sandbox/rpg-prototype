/* @flow */
import type { SetupAction as Action } from '../actions/setupActions'

export type State = {}
const initialState: State = {}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state
  }
}
