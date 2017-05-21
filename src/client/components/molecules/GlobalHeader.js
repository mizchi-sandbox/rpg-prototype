/* @flow */
import React from 'react'
import * as AppActions from '../../actions/appActions'
import type { GlobalHeaderContainerProps } from '../../containers/GlobalHeader'

export default function GlobalHeader(props: GlobalHeaderContainerProps) {
  return (
    <div style={{ backgroundColor: '#333', color: '#ddd', padding: '3px' }}>
      <span>
        Playing:
        {props.playing.playingSession &&
          props.playing.playingSession.savedataId}
      </span>
      /
      <div style={{ display: 'inline-block' }}>
        {props.app.sceneStack.map(scene => `[${scene.sceneId}]`).join(' > ')}
      </div>
      {props.app.sceneStack.length > 1 &&
        <button
          style={{ color: 'black' }}
          onClick={_ => props.dispatch(AppActions.popScene())}
        >
          back
        </button>}
      &nbsp;
      <div style={{ display: 'inline-block' }}>
        <span>Resources/</span>
        {props.playing.playingSession &&
          props.playing.playingSession.resources.map((r, index) => (
            <span key={index}>{r.resourceName}: {r.amount}</span>
          ))}
      </div>
    </div>
  )
}
