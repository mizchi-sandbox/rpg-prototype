/* @flow */
import React, { Component } from 'react'
import type { Skill } from 'core/lib/battle'
import { tickRequest, startRequest } from '../reducers/battle'
import type { BattleContainerProps } from '../containers/BattleContainer'

export function SkillIcon (
  props: Skill
) {
  return <div onClick={_ev => {
    console.log('skill clicked', props)
  }}>
    {props.displayName}: {props.actionCost}
  </div>
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
    const fps = 0.5

    this.props.dispatch(startRequest())

    const update = () => {
      this._timeoutId = setTimeout(() => {
        this.props.dispatch(tickRequest())
        update()
      }, 1000 / fps)
    }
    update()
  }

  componentWillUnmount () {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId)
    }
  }
  render () {
    // const props = this.props
    if (!this.props.battleState) {
      return <h1>Loading</h1>
    } else {
      const battleState = this.props.battleState
      const battlers = [].concat(battleState.allies).concat(battleState.enemies)
      return <div className='battle'>
        <span>{battleState.turn}</span>
        {
          battlers.map(battler => {
            return <div key={battler.name}>
              <div>
                {battler.name}: {battler.life}
              </div>
              <div>
                AP: {battler.ap.val} / {battler.ap.max}
              </div>
              {
                battler.skills.map(skill => {
                  return <SkillIcon {...skill} key={skill.id}/>
                })
              }
            </div>
          })
        }
      </div>
    }
  }
}
