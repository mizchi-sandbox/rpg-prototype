/* @flow */
import React from 'react'
import Modal from 'react-modal'
import { StyleSheet, css } from 'aphrodite'
import {
  addInputToQueue,
  requestPause,
  requestRestart,
  requestStart,
  setSkillSelector,
  unsetSkillSelector,
  moveSkillSelector
} from '../../actions/battleActions'
import { popScene } from '../../actions/appActions'
import Button from '../atoms/Button'
import LogBoard from '../molecules/LogBoard'
import AllyBattlersDisplay from '../molecules/AllyBattlersDisplay'
import EnemyBattlersDisplay from '../molecules/EnemyBattlersDisplay'
import InputQueueDisplay from '../molecules/InputQueueDisplay'
import GlobalKeyListner from '../helpers/GlobalKeyListener'
import type { BattleContainerProps } from '../../containers/BattleContainer'

export function BattleSessionResultModal(props: {
  isOpen: boolean,
  onClickClose: Function,
  result: any
}) {
  return (
    <Modal
      isOpen={props.isOpen}
      style={{
        content: {
          top: '30%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width: '50%',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)'
        }
      }}
      contentLabel="Modal"
    >
      {props.result &&
        <div>
          <h1>{props.result.message}</h1>
          <button onClick={props.onClickClose}>close</button>
        </div>}
    </Modal>
  )
}

export default class BattleScene extends React.Component {
  props: BattleContainerProps

  componentDidMount() {
    this.props.dispatch(requestStart())
  }

  render() {
    const { runner, log, dispatch } = this.props
    if (!runner.battleState) {
      return <h1>Loading</h1>
    } else {
      const { battleState, inputQueue, paused, skillSelectCursor } = runner
      return (
        <div
          className={css(styles.container)}
          style={{
            backgroundColor: paused ? '#eee' : '#fff'
          }}
        >
          <BattleSessionResultModal
            isOpen={!!runner.battleCommandResult}
            result={runner.battleCommandResult}
            onClickClose={_ev => {
              // dispatch(closeCommandResult())
              dispatch(popScene())
            }}
          />
          <GlobalKeyListner
            keyCode={32} // space
            handler={_ => {
              if (paused) {
                dispatch(requestRestart())
              } else {
                dispatch(requestPause())
              }
            }}
          />
          <GlobalKeyListner
            keyCode={38} // up
            handler={_ => {
              dispatch(moveSkillSelector(0, -1))
            }}
          />
          <GlobalKeyListner
            keyCode={40} // down
            handler={_ => {
              dispatch(moveSkillSelector(0, +1))
            }}
          />
          <GlobalKeyListner
            keyCode={37} // left
            handler={_ => {
              dispatch(moveSkillSelector(-1, 0))
            }}
          />
          <GlobalKeyListner
            keyCode={39} // right
            handler={_ => {
              dispatch(moveSkillSelector(+1, 0))
            }}
          />
          <GlobalKeyListner
            keyCode={13} // enter
            handler={_ => {
              if (skillSelectCursor) {
                const { x, y } = skillSelectCursor
                const ally = battleState.battlers[y]
                if (ally) {
                  const skill = ally.skills[x]
                  if (
                    skill.cooldown.val >= skill.cooldown.max &&
                    !inputQueue.map(iq => iq.skillId).includes(skill.id)
                  ) {
                    dispatch(addInputToQueue(ally.id, skill.id))
                  }
                }
              }
            }}
          />
          <div className={css(styles.header)}>
            <BattleSessionController
              paused={paused}
              onClickPause={_ => {
                dispatch(requestPause())
              }}
              onClickRestart={_ => {
                dispatch(requestRestart())
              }}
            />
          </div>
          <div className={css(styles.enemies)}>
            <EnemyBattlersDisplay
              enemies={battleState.battlers.filter(b => b.side === 'enemy')}
            />
          </div>
          <div className={css(styles.allies)}>
            <AllyBattlersDisplay
              skillSelectCursor={skillSelectCursor}
              allies={battleState.battlers.filter(b => b.side === 'ally')}
              isSkillInQueue={skill =>
                inputQueue.map(input => input.skillId).includes(skill.id)}
              onAllyAndSkillSelect={ally => skill => {
                // Check skill is executable with queue
                if (
                  skill.cooldown.val >= skill.cooldown.max &&
                  !inputQueue.map(iq => iq.skillId).includes(skill.id)
                ) {
                  dispatch(addInputToQueue(ally.id, skill.id))
                }
              }}
            />
          </div>
          <div className={css(styles.log)}>
            <InputQueueDisplay
              inputQueue={inputQueue}
              battleState={battleState}
            />
            {inputQueue.length > 0 && <hr />}
            <LogBoard messages={log} direction="bottom" />
          </div>
        </div>
      )
    }
  }
}

export function BattleSessionController({
  paused,
  onClickPause,
  onClickRestart
}: {
  paused: boolean,
  onClickPause: Function,
  onClickRestart: Function
}) {
  return paused
    ? <Button onClick={onClickRestart} label="Restart(Space)" />
    : <Button onClick={onClickPause} label="Pause(Space)" />
}

const styles = StyleSheet.create({
  container: {
    display: 'grid',
    height: '100%',
    width: '100%',
    gridTemplateAreas: `
      "header header"
      "enemies log"
      "allies log"
    `,
    gridTemplateColumns: `3fr 2fr`,
    gridTemplateRows: `
      40px
      1fr
      1fr
    `
  },
  header: {
    padding: '3px',
    gridArea: 'header'
  },
  main: {
    gridArea: 'main'
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
