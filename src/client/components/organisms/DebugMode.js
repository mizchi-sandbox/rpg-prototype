/* @flow */
import React from 'react'
import type {
  DebugModeContainerProps
} from '../../containers/DebugModeContainer'
import * as AppActions from '../../actions/AppActions'

export default function DebugMode(props: DebugModeContainerProps) {
  return (
    <div>
      <h1>DebugMode</h1>
      <hr />
      {props.app.sceneStack.map(scene => <div>{scene.sceneId}</div>)}
      <button
        onClick={() => {
          props.dispatch(AppActions.pushBattleScene({}))
        }}
      >
        Battle start
      </button>
    </div>
  )
}
