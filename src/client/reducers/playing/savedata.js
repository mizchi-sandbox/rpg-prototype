/* @flow */
export type Action =
  | {
    type: 'TODO'
  }
export type State = {}
const initialState: State = {}

export default (
  state: State = initialState,
  action: Action
) => {
  switch (action.type) {
    default:
      return state
  }
}
