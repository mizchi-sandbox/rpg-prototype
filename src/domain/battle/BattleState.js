/* @flow */
import { updateBattler } from './Battler'
import { buildBattlerSkill } from './BattlerSkill'
import { execCommand } from './Command'
import type { Battler } from './Battler'
import type { Command, CommandOnProgressState } from './Command'
import type { Result } from './Result'
import type { Input } from './Input'

// State
export type BattleState = {
  inputQueue: Input[],
  battlers: Battler[],
  turn: number
}

export function processDecisionPhase(
  state: BattleState
): { state: BattleState, commandQueue: Command[] } {
  let commandQueue: Command[] = []
  // process battlers
  const { inputQueue } = state
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
): { state: BattleState, results: Result[] } {
  const commanded: CommandOnProgressState = commandQueue.reduce(
    (next: CommandOnProgressState, nextCmd: Command) => {
      const { state: nextState, results } = execCommand(next.state, nextCmd)
      return {
        state: nextState,
        results: next.results.concat(results)
      }
    },
    { state, results: [] }
  )
  return commanded
}

export function processTurn(
  state: BattleState
): { state: BattleState, results: Result[] } {
  // decide command
  const { state: decisionedState, commandQueue } = processDecisionPhase(state)
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

const initialState: BattleState = {
  inputQueue: [],
  battlers: [
    {
      id: Symbol(),
      side: 'ally',
      formationOrder: 0,
      controllable: true,
      name: 'mizchi',
      life: { val: 50, max: 50 },
      skills: [
        buildBattlerSkill('$attack', 1),
        buildBattlerSkill('$power-attack', 1)
      ]
    },
    {
      id: Symbol(),
      side: 'enemy',
      formationOrder: 0,
      controllable: false,
      name: 'goblin',
      life: { val: 30, max: 30 },
      skills: [buildBattlerSkill('$attack', 1)]
    }
  ],
  turn: 0
}

export function createBattleMock(): BattleState {
  return initialState
}
