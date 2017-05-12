/* @flow */
import React from 'react'
import type {
  DebugModeContainerProps
} from '../../containers/DebugModeContainer'
import * as appActions from '../../actions/appActions'
import * as playingSessionActions from '../../actions/playingSessionActions'

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
      <hr />
      <p>PlayingSession Dump</p>
      <ul>
        {props.playingSession.playingSession &&
          props.playingSession.playingSession.actors.map((a, index) => (
            <div key={index}>{a.displayName}</div>
          ))}
      </ul>
    </div>
  )
}

export default class _DebugMode extends React.Component {
  props: DebugModeContainerProps
  componentDidMount() {
    this.props.dispatch(playingSessionActions.requestLoadPlayingSession())
  }
  render() {
    return <DebugMode {...this.props} dispatch={this.props.dispatch} />
  }
}
