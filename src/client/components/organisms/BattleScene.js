/* @flow */
import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import {
  addInputToQueue,
  requestPause,
  requestRestart,
  requestStart
} from '../../actions/battleActions'
import Button from '../atoms/Button'
import LogBoard from '../molecules/LogBoard'
import AllyBattlersDisplay from '../molecules/AllyBattlersDisplay'
import EnemyBattlersDisplay from '../molecules/EnemyBattlersDisplay'
import GlobalKeyListner from '../helpers/GlobalKeyListener'
import type { BattleContainerProps } from '../../containers/BattleContainer'
import type { Input, BattleState } from 'domain/battle'

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
        <div
          className={css(styles.container)}
          style={{
            backgroundColor: paused ? '#bbb' : '#fff'
          }}
        >
          <GlobalKeyListner
            keyCode={32} // space
            handler={_ => {
              if (paused) {
                this.props.dispatch(requestRestart())
              } else {
                this.props.dispatch(requestPause())
              }
            }}
          />
          <div className={css(styles.header)}>
            <BattleStateController
              paused={paused}
              onClickPause={_ => {
                this.props.dispatch(requestPause())
              }}
              onClickRestart={_ => {
                this.props.dispatch(requestRestart())
              }}
            />
          </div>
          <div className={css(styles.enemies)}>
            <div className={css(styles.enemies)}>
              <EnemyBattlersDisplay
                enemies={battleState.battlers.filter(b => b.side === 'enemy')}
              />
            </div>
          </div>
          <div className={css(styles.allies)}>
            <div className={css(styles.allies)}>
              <AllyBattlersDisplay
                allies={battleState.battlers.filter(b => b.side === 'ally')}
                onAllyAndSkillSelect={ally => skill => {
                  // Check skill is executable with queue
                  if (
                    skill.cooldown.val >= skill.cooldown.max &&
                    !inputQueue.map(iq => iq.skillId).includes(skill.id)
                  ) {
                    this.props.dispatch(addInputToQueue(ally.id, skill.id))
                  }
                }}
              />
            </div>
          </div>
          <div className={css(styles.log)}>
            <InputQueueDisplay
              inputQueue={inputQueue}
              battleState={battleState}
            />
            {inputQueue.length > 0 && <hr />}
            <LogBoard messages={log} direction="bottom" />
          </div>
          <div className={css(styles.footer)}>
            Footer
          </div>
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
    ? <Button onClick={onClickRestart} label="Restart" />
    : <Button onClick={onClickPause} label="Pause" />
}

export function InputQueueDisplay({
  inputQueue,
  battleState
}: {
  inputQueue: Input[],
  battleState: BattleState
}) {
  return (
    <div>
      {inputQueue.map((input, index) => {
        const actorToAction = battleState.battlers.find(
          b => b.id === input.battlerId
        )
        return (
          <div key={index}>
            {actorToAction && actorToAction.name}: Ready {input.skillId}
          </div>
        )
      })}
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'grid',
    height: '60vh',
    width: '80vw',
    gridTemplateAreas: `
      "header header"
      "enemies log"
      "allies log"
      "footer footer"
    `,
    gridTemplateColumns: `3fr 2fr`,
    gridTemplateRows: `
      40px
      1fr
      1fr
      30px
    `
  },
  header: {
    backgroundColor: 'wheat',
    gridArea: 'header'
  },
  main: {
    gridArea: 'main'
  },
  footer: {
    backgroundColor: 'wheat',
    gridArea: 'footer'
  },

  allies: {
    boxSizing: 'border-box',
    padding: '15px',
    minHeight: '100px',
    gridArea: 'allies'
  },

  enemies: {
    margin: 'auto auto',
    gridArea: 'enemies'
  },

  log: {
    paddingTop: '40px',
    gridArea: 'log'
  }
})
