/* @flow */
import * as AppActions from '../actions/appActions'
import type { AppAction } from '../actions/appActions'

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

export default (session: State = initialState, action: AppAction) => {
  switch (action.type) {
    case AppActions.PUSH_SCENE:
      return { ...session, sceneStack: session.sceneStack.concat([action.payload]) }
    case AppActions.POP_SCENE:
      return { ...session, sceneStack: session.sceneStack.slice(0, -1) }
    default:
      return session
  }
}
