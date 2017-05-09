/* @flow */
import type { Scene } from '../reducers/app'

export const PUSH_SCENE = 'app/PUSH_SCENE'
export const POP_SCENE = 'app/POP_SCENE'
export type Action =
  | {
      type: typeof PUSH_SCENE,
      payload: Scene
    }
  | {
      type: typeof POP_SCENE
    }

export function pushBattleScene(sceneData: {}) {
  return {
    type: PUSH_SCENE,
    payload: {
      sceneId: 'battle',
      sceneData
    }
  }
}

export function popScene() {
  return {
    type: POP_SCENE
  }
}
