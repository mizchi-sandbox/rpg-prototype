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
  return {
    state: { ...state, battlers },
    commandQueue
  }
}
export function processCommandPhase(
  state: BattleState,
  commandQueue: Command[]
): CommandApplicationProgress {
  return commandQueue.reduce(
    (next: CommandApplicationProgress, nextCmd: Command) => {
      const { state: nextState, results } = nextCmd(next.state)
      return {
        state: nextState,
        results: next.results.concat(results)
      }
    },
    { state, results: [] }
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
): { state: BattleState, results: CommandResult[] } {
  // decide command
  const { state: decisionedState, commandQueue } = processDecisionPhase(
    state,
    inputQueue
  )
  // exec command
  const { state: resultedState, results } = processCommandPhase(
    decisionedState,
    commandQueue
  )
  return {
    state: {
      ...resultedState,
      turn: state.turn + 1,
      inputQueue: []
    },
    results
  }
}

export function createBattleState(): BattleState {
  // TODO: Return real state
  return battleStateMock0
}
