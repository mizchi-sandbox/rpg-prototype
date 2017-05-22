/* @flow */
import React from 'react'
import { lifecycle } from 'recompose'
import type {
  DebugModeContainerProps
} from '../../containers/DebugModeContainer'
import * as appActions from '../../actions/appActions'
// import * as adventureActions from '../../actions/adventureActions'
import * as playingActions from '../../actions/playingActions'

export default lifecycle({
  componentDidMount() {
    // console.log('didmount')
  }
})(function DebugMode(props: DebugModeContainerProps) {
  return (
    <div>
      <h1>DebugMode</h1>
      <hr />
      debug:
      <button
        onClick={() => {
          props.dispatch(playingActions.requestToStartPlayingSession('$save1'))
        }}
      >
        Use $save1
      </button>
      <button
        onClick={() => {
          props.dispatch(playingActions.requestToStartPlayingSession('$save2'))
        }}
      >
        Use $save2
      </button>
      &nbsp;
      <button
        onClick={() => {
          props.dispatch(appActions.pushBattleScene({}))
        }}
      >
        Battle start with mock data
      </button>
      <button
        onClick={() => {
          props.dispatch(appActions.toggleResetOnReload())
        }}
      >
        [WIP] Reset on reload
      </button>
      <hr />
      Menu:
      <button
        onClick={() => {
          props.dispatch(appActions.pushSetupScene({}))
        }}
      >
        Setup
      </button>
      <button
        onClick={() => {
          // props.dispatch(appActions.pushSetupScene({}))
        }}
      >
        [WIP] Select World
      </button>
      <button
        onClick={() => {
          props.dispatch(appActions.pushAdventureScene({}))
        }}
      >
        Adventure Start
      </button>
      <hr />
      <div>
        <h3>Actors</h3>
        {props.adventure.adventureSession &&
          props.adventure.adventureSession.actors.map((a, index) => (
            <div key={index}>{a.displayName}</div>
          ))}
      </div>
    </div>
  )
})
