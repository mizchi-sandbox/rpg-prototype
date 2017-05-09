/* @flow */
import React from 'react'
import type {
  DebugModeContainerProps
} from '../../containers/DebugModeContainer'
import * as AppActions from '../../actions/appActions'

export default function DebugMode(props: DebugModeContainerProps) {
  return (
    <div>
      <h1>DebugMode</h1>
      <hr />
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
