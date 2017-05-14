/* @flow */
import React from 'react'
import * as appActions from '../../actions/appActions'

export default function AdventureScene(props: { dispatch: any }) {
  return (
    <div>
      <h1>AdventureScene</h1>
      <button
        onClick={() => {
          props.dispatch(appActions.pushBattleScene({}))
        }}
      >
        Go forward
      </button>
      <button
        onClick={() => {
          props.dispatch(appActions.popScene())
        }}
      >
        Exit
      </button>
    </div>
  )
}
