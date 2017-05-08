/* @flow */
import { updateBattler } from './Battler'
import type { Battler } from './Battler'
import type { Command, CommandApplicationProgress } from './Command'
import type { CommandResult } from './CommandResult'
import type { Input } from './Input'
import { battleStateMock0 } from './__mock/battleStateMock'

// State
export type BattleState = {
  battlers: Battler[],
  turn: number
}

export function processDecisionPhase(
  state: BattleState,
  inputQueue: Input[]
): { state: BattleState, commandQueue: Command[] } {
  let commandQueue: Command[] = []
  // process battlers
  const battlers = state.battlers.map(battler => {
    const inputs = inputQueue.filter(input => input.battlerId === battler.id)
    const { battler: nextBattler, commands } = updateBattler(
      battler,
      inputs,
      state
    )
    commandQueue = commandQueue.concat(commands)
    return nextBattler
  })
  return Object.freeze({
    state: { ...state, battlers },
    commandQueue
  })
}
export function processCommandPhase(
  state: BattleState,
  commandQueue: Command[]
): CommandApplicationProgress {
  return Object.freeze(
    commandQueue.reduce(
      (next: CommandApplicationProgress, nextCmd: Command) => {
        const { state: nextState, commandResults } = nextCmd(next.state)
        return {
          state: nextState,
          commandResults: next.commandResults.concat(commandResults)
        }
      },
      { state, commandResults: [] }
    )
  )
}

export function isBattleFinished(
  state: BattleState
): ?{ winner: 'ally' | 'enemy' } {
  if (
    state.battlers.filter(b => b.side === 'enemy').every(b => b.life.val <= 0)
  ) {
    return { winner: 'ally' }
  }

  if (
    state.battlers.filter(b => b.side === 'ally').every(b => b.life.val <= 0)
  ) {
    return { winner: 'enemy' }
  }

  return null
}

export function processTurn(
  state: BattleState,
  inputQueue: Input[]
): { state: BattleState, commandResults: CommandResult[] } {
  // decide command
  const { state: decisionedState, commandQueue } = processDecisionPhase(
    state,
    inputQueue
  )
  // exec command
  const { state: resultedState, commandResults } = processCommandPhase(
    decisionedState,
    commandQueue
  )
  return Object.freeze({
    state: {
      ...resultedState,
      turn: state.turn + 1,
      inputQueue: []
    },
    commandResults
  })
}

export function createBattleState(): BattleState {
  // TODO: Return real state
  return battleStateMock0
}
