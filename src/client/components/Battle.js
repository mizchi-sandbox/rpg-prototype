/* @flow */
import React, { Component } from 'react'
import type { Skill } from '../../gen/types'
import { startRequest } from '../reducers/battle'
import type { BattleContainerProps } from '../containers/BattleContainer'

export function SkillIcon (
  props: {
    skill: Skill,
    onSelect: Function
  },
) {
  return <span onClick={_ev => {
    // console.log('skill clicked', props)
    props.onSelect(props.skill)
  }}>
    {props.skill.displayName}: {props.skill.actionCost} |
  </span>
}

export default class Battle extends Component {
  props: BattleContainerProps
  state: {
    drawCounter: number
  } = {
    drawCounter: 0
  }

  _timeoutId = null
  componentDidMount () {
    this.props.dispatch(startRequest())
  }

  render () {
    // const props = this.props
    if (!this.props.battleState) {
      return <h1>Loading</h1>
    } else {
      const battleState = this.props.battleState
      return <div className='battle'>
        <span>{battleState.turn}</span>
        {
          battleState.battlers.map(battler => {
            return <div key={battler.name}>
              <div>
                {battler.name}: {battler.life.val} / {battler.life.max}
              </div>
              <div>
                AP: {battler.ap.val} / {battler.ap.max}
              </div>
              {
                battler.skills.map(skill => {
                  return <SkillIcon
                    skill={skill}
                    key={skill.id}
                    onSelect={_sk => {
                      // props.dispatch()
                    }
                  }/>
                })
              }
            </div>
          })
        }
      </div>
    }
  }
}
