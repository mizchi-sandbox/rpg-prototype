/* @flow */
import React, { Component } from 'react'
import { processTurnStart } from '../reducers/battle'
import type { BattleContainerProps } from '../containers/BattleContainer'

// eslint-disable-next-line
import type { Skill } from '../reducers/battle'

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

  componentDidMount () {
    // let updateCounter = 0
    // const speed = 60

    const fps = 0.5

    const update = () => {
      setTimeout(() => {
        this.props.dispatch(processTurnStart())
        update()
      }, 1000 / fps)
    }
    update()
  }
  render () {
    const props = this.props
    const battlers = [].concat(props.allies).concat(props.enemies)
    return <div className='battle'>
      <span>{props.turn}</span>
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
                return <SkillIcon {...skill} key={skill.skillId}/>
              })
            }
          </div>
        })
      }
      <div onClick={_ev => {
        props.dispatch(processTurnStart())
      }}>
        Step
      </div>
    </div>
  }
}
