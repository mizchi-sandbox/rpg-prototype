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
            props.dispatch(
              adventureActions.requestAddResources([
                {
                  resourceId: '$energy',
                  resourceName: 'energy',
                  amount: 30
                }
              ])
            )
          }}
        >
          Exec something event
        </button>
        <button
          onClick={() => {
            // props.dispatch(appActions.popScene())
            // props.dispatch(adventureActions.exit())
            if (props.adventureSession) {
              const result = {
                session: props.adventureSession
              }
              props.dispatch(adventureActions.requestExit(result))
            }
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
      <div style={{ display: 'inline-block' }}>
        <span>Resources/</span>
        {props.adventureSession &&
          props.adventureSession.resources.map((r, index) => (
            <span key={index}>{r.resourceName}: {r.amount}</span>
          ))}
      </div>
    </div>
  )
})
