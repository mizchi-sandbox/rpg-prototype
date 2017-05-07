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
import Button from '../atoms/Button'
import LogBoard from '../molecules/LogBoard'
import SkillBar from '../molecules/SkillBar'
import type { Battler, Input, BattlerSkill } from 'domain/battle'

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
            <InputQueueDisplay inputQueue={inputQueue} />
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
                onSkillSelect={ally => skill =>
                  this.props.dispatch(addInputToQueue(ally.id, skill.id))}
              />
            </div>
          </div>
          <div className={css(styles.log)}>
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

export function InputQueueDisplay({ inputQueue }: { inputQueue: Input[] }) {
  return <span>InputQueue: {inputQueue.length}</span>
}

export function AllyBattlersDisplay({
  allies,
  onSkillSelect
}: {
  allies: Battler[],
  onSkillSelect: Battler => BattlerSkill => void
}) {
  return (
    <div>
      {allies.map((ally, index) => (
        <div
          key={index}
          style={{
            display: 'flex'
          }}
        >
          <div style={{ width: '80px' }}>
            <div>{ally.name}</div>
            <div style={{ width: '100px' }}>
              <span>{ally.life.val}</span>
              /
              <span>{ally.life.max}</span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <SkillBar
              skills={ally.skills}
              onSkillSelect={onSkillSelect(ally)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export function EnemyBattlersDisplay({ enemies }: { enemies: Battler[] }) {
  return (
    <div>
      {enemies.map((enemy, index) => (
        <div style={{ display: 'inline-block', padding: '15px' }} key={index}>
          <img
            src="/assets/EnemyGraphic/GD_Goblin(Green).png"
            style={{
              filter: enemy.life.val > 0 ? 'grayscale(0)' : 'grayscale(1)'
            }}
          />
          <div>
            <span>{enemy.name}</span>
            &nbsp;
            <span>{enemy.life.val}</span>
            /
            <span>{enemy.life.max}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// export function BattlersDisplay({
//   battleState,
//   onSkillSelect
// }: {
//   battleState: BattleState,
//   onSkillSelect: Battler => BattlerSkill => void
// }) {
//   return (
//     <div className="battle">
//       {battleState.battlers.map((battler, index) => (
//         <BattlerLine
//           battler={battler}
//           key={index}
//           onSkillSelect={onSkillSelect(battler)}
//         />
//       ))}
//     </div>
//   )
// }

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
    // height: '20vh',
    gridArea: 'footer'
  },

  allies: {
    boxSizing: 'border-box',
    padding: '15px',
    minHeight: '100px',
    gridArea: 'allies'
  },

  enemies: {
    // paddingTop: '32px',
    margin: 'auto auto',
    gridArea: 'enemies'
  },

  log: {
    paddingTop: '40px',
    gridArea: 'log'
  }
})
