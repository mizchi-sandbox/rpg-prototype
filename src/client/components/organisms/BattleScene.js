/* @flow */
import React, { Component } from 'react'
import {
  requestStart,
  requestPause,
  requestRestart,
  addInputToQueue
} from '../../actions/battleActions'
import type { BattleContainerProps } from '../../containers/BattleContainer'
import Button from '../atoms/Button'
import BattlerLine from '../molecules/BattlerLine'
import LogBoard from '../molecules/LogBoard'

export default class BattleScene extends Component {
  props: BattleContainerProps

  _timeoutId = null
  componentDidMount() {
    this.props.dispatch(requestStart())
  }

  render() {
    if (!this.props.battleState) {
      return <h1>Loading</h1>
    } else {
      const { battleState, inputQueue, log } = this.props
      return (
        <div className="battle">
          {this.props.paused
            ? <Button
                onClick={_ => {
                  this.props.dispatch(requestRestart())
                }}
                label="Restart"
              />
            : <Button
                onClick={_ => {
                  this.props.dispatch(requestPause())
                }}
                label="Pause"
              />}
          <hr />
          <span>Turn: {battleState.turn}</span>
          &nbsp;
          <span>InputQueue: {inputQueue.length}</span>
          {battleState.battlers.map((battler, index) => (
            <BattlerLine
              battler={battler}
              key={index}
              onSkillSelect={skill => {
                this.props.dispatch(addInputToQueue(battler.id, skill.id))
              }}
            />
          ))}
          <hr />
          <LogBoard messages={log} direction="bottom" />
        </div>
      )
    }
  }
}
