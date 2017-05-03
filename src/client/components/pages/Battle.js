/* @flow */
import React, { Component } from 'react'
import { requestStart, requestPause, requestRestart } from '../../actions/battleActions'
import type { BattleContainerProps } from '../../containers/BattleContainer'
import SkillBar from '../molecules/SkillBar'

export default class Battle extends Component {
  props: BattleContainerProps
  state: {
    drawCounter: number
  } = {
    drawCounter: 0
  }

  _timeoutId = null
  componentDidMount () {
    this.props.dispatch(requestStart())
  }

  render () {
    if (!this.props.battleState) {
      return <h1>Loading</h1>
    } else {
      const battleState = this.props.battleState
      return <div className='battle'>
        { this.props.paused
          ? <button
              onClick={_ => {
                this.props.dispatch(requestRestart())
              }}
            >
              Restart
            </button>
          : <button
              onClick={_ => {
                this.props.dispatch(requestPause())
              }}
            >
              Pause
            </button>
        }
        <hr/>
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
              <SkillBar skills={battler.skills} />
            </div>
          })
        }
      </div>
    }
  }
}
