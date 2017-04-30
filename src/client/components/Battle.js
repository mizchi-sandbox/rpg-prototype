/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { stepToNextTurn } from '../reducers/battle'
import type { State as BattleState, Battler } from '../reducers/battle'
import type { BattleContainerProps } from '../containers/BattleContainer'

export default function Battle (props: BattleContainerProps) {
  const battlers: Battler[] = [].concat(props.allies).concat(props.enemies)
  return <div className='battle'>
    {
      battlers.map(battler => {
        return <div key={battler.name}>
          {battler.name}: {battler.count}: {battler.life}
        </div>
      })
    }
    <div onClick={ev => {
      props.dispatch(stepToNextTurn())
    }}>
      Step
    </div>
  </div>
}
