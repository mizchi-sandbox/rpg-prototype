/* @flow */
import React from 'react'
import type {
  DebugModeContainerProps
} from '../../containers/DebugModeContainer'
import * as appActions from '../../actions/appActions'
import * as adventureActions from '../../actions/adventureActions'
import * as playingActions from '../../actions/playingActions'

export function DebugMode(props: DebugModeContainerProps) {
  return (
    <div>
      <h1>DebugMode</h1>
      <hr />
      <button
        onClick={() => {
          props.dispatch(appActions.pushBattleScene({}))
        }}
      >
        Battle start
      </button>
      <button
        onClick={() => {
          props.dispatch(appActions.pushAdventureScene({}))
        }}
      >
        Adventure start
      </button>
      <hr />
      <p>AdventureSession Dump</p>
      <div>
        <h3>Actors</h3>
        {props.adventure.adventureSession &&
          props.adventure.adventureSession.actors.map((a, index) => (
            <div key={index}>{a.displayName}</div>
          ))}
      </div>
      <hr />
      <div>
        <h3>Resources</h3>
        {props.adventure.adventureSession &&
          props.adventure.adventureSession.resources.map((r, index) => (
            <div key={index}>{r.resourceName}: {r.amount}</div>
          ))}
      </div>
    </div>
  )
}

export default class _DebugMode extends React.Component {
  props: DebugModeContainerProps
  componentDidMount() {
    this.props.dispatch(playingActions.requestToStartPlayingSession({}))
    this.props.dispatch(adventureActions.requestLoadAdventureSession())
  }
  render() {
    return <DebugMode {...this.props} dispatch={this.props.dispatch} />
  }
}
