/* @flow */

// Actions
export const RESET = 'battle:reset'
export type Action = {
  type: typeof RESET
}

// State
export type State = {
  counter: number
}

const initialState: State = {
  counter: 0
}

// Reducer
export default (
  state: State = initialState,
  action: Action
) => {
  switch(action.type) {
    case RESET:
      return initialState
    default:
      return state
  }
}
