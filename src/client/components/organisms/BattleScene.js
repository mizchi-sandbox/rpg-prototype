/* @flow */
import React from 'react'
import { StyleSheet, css } from 'aphrodite'

import type { BattleContainerProps } from '../../containers/BattleContainer'
import {
  addInputToQueue,
  requestPause,
  requestRestart,
  requestStart
} from '../../actions/battleActions'
import BattlerLine from '../molecules/BattlerLine'
import Button from '../atoms/Button'
import LogBoard from '../molecules/LogBoard'
import type { Battler, BattleState, Input, BattlerSkill } from 'domain/battle'

export default class BattleScene extends React.Component {
  props: BattleContainerProps

  _timeoutId = null
  componentDidMount() {
    this.props.dispatch(requestStart())
  }

  render() {
    const { runner, log } = this.props
    if (!runner.battleState) {
      return <h1>Loading</h1>
    } else {
      const { battleState, inputQueue, paused } = runner
      return (
        <div className={css(styles.container)}>
          <BattleStateController
            paused={paused}
            onClickPause={_ => {
              this.props.dispatch(requestPause())
            }}
            onClickRestart={_ => {
              this.props.dispatch(requestRestart())
            }}
          />
          <hr />
          <InputQueueDisplay inputQueue={inputQueue} />
          <hr />
          <BattleStateDisplay
            battleState={battleState}
            onSkillSelect={battler => skill =>
              this.props.dispatch(addInputToQueue(battler.id, skill.id))}
          />
          <hr />
          <LogBoard messages={log} direction="bottom" />
        </div>
      )
    }
  }
}

export function BattleStateController({
  paused,
  onClickPause,
  onClickRestart
}: {
  paused: boolean,
  onClickPause: Function,
  onClickRestart: Function
}) {
  return paused
    ? <Button onClick={onClickPause} label="Restart" />
    : <Button onClick={onClickRestart} label="Pause" />
}

export function InputQueueDisplay({ inputQueue }: { inputQueue: Input[] }) {
  return <span>InputQueue: {inputQueue.length}</span>
}

export function BattleStateDisplay({
  battleState,
  onSkillSelect
}: {
  battleState: BattleState,
  onSkillSelect: Battler => BattlerSkill => void
}) {
  return (
    <div className="battle">
      {battleState.battlers.map((battler, index) => (
        <BattlerLine
          battler={battler}
          key={index}
          onSkillSelect={onSkillSelect(battler)}
        />
      ))}
    </div>
  )
}

const styles = StyleSheet.create({
  container: {}
})
