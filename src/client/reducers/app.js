/* @flow */
export type Action = {
  type: '@app/TODO'
}

type Scene = {
  sceneId: 'battle',
  sceneData: {}
}

export type State = {
  sceneStack: Scene[]
}

const initialState: State = {
  sceneStack: [{ sceneId: 'battle', sceneData: {} }]
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state
  }
}
