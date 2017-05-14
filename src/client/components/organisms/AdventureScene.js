/* @flow */
import React from 'react'
import { lifecycle } from 'recompose'
import * as appActions from '../../actions/appActions'
import * as adventureActions from '../../actions/adventureActions'
import type {
  AdventureContainerProps
} from '../../containers/AdventureContainer'
import LogBoard from '../molecules/LogBoard'

export default lifecycle({
  componentDidMount() {
    this.props.dispatch(adventureActions.requestLoadAdventureSession())
  }
})(function AdventureScene(props: AdventureContainerProps) {
  return (
    <div>
      <h1>AdventureScene</h1>
      <div>
        <button
          onClick={() => {
            props.dispatch(appActions.pushBattleScene({}))
          }}
        >
          Enter battle
        </button>
        <button
          onClick={() => {
            props.dispatch(adventureActions.addLog('Test'))
          }}
        >
          Exec something event
        </button>
        <button
          onClick={() => {
            props.dispatch(appActions.popScene())
          }}
        >
          Exit
        </button>
      </div>
      <LogBoard direction="upper" messages={props.log} />
      <div />
      <div>
        <h3>Actors</h3>
        {props.adventureSession &&
          props.adventureSession.actors.map((a, index) => (
            <div key={index}>{a.displayName}</div>
          ))}
      </div>
    </div>
  )
})
