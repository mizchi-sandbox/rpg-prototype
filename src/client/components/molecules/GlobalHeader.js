/* @flow */
import React from 'react'
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
      &nbsp;
      <div style={{ display: 'inline-block' }}>
        <span>Resources/</span>
        {props.adventure.adventureSession &&
          props.adventure.adventureSession.resources.map((r, index) => (
            <span key={index}>{r.resourceName}: {r.amount}</span>
          ))}
      </div>
    </div>
  )
}
