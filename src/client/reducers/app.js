/* @flow */
import * as AppActions from '../actions/AppActions'
import type { Action as AppAction } from '../actions/AppActions'

export type Action = AppAction

export type Scene =
  | {
      sceneId: 'battle',
      sceneData: {}
    }
  | {
      sceneId: 'debug-mode',
      sceneData: {}
    }

export type State = {
  sceneStack: Scene[]
}

const initialState: State = {
  sceneStack: [{ sceneId: 'debug-mode', sceneData: {} }]
}

export default (state: State = initialState, action: AppAction) => {
  switch (action.type) {
    case AppActions.PUSH_SCENE:
      return { ...state, sceneStack: state.sceneStack.concat([action.payload]) }
    case AppActions.POP_SCENE:
      return { ...state, sceneStack: state.sceneStack.slice(0, -1) }
    default:
      return state
  }
}
