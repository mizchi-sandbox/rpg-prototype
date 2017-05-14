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
          props.dispatch(appActions.pushAdventureScene({}))
        }}
      >
        Adventure start
      </button>
      <button
        onClick={() => {
          props.dispatch(appActions.pushBattleScene({}))
        }}
      >
        Battle start with mock data
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
}

export default class _DebugMode extends React.Component {
  props: DebugModeContainerProps
  componentDidMount() {
    this.props.dispatch(playingActions.requestToStartPlayingSession('$save1'))
    this.props.dispatch(adventureActions.requestLoadAdventureSession())
  }
  render() {
    return <DebugMode {...this.props} dispatch={this.props.dispatch} />
  }
}
