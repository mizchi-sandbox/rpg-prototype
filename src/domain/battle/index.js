/* @flow */
// import { increment, consume } from '../values/ConsumableValue'
import loadMaster from '../util/loadMaster'
import type { Skill } from '../master/types'
import type { ConsumableValue } from '../values/ConsumableValue'

export type Input = {
  battlerId: string,
  skillId: string
}

export type Command = {
  battlerId: string,
  skillId: string
}

export type Result = {
  type: string
}

// State
export type BattleState = {
  inputQueue: Input[],
  commandQueue: Command[],
  battlers: Battler[],
  turn: number
}

export type Battler = {
  side: 'ally' | 'enemy',
  controllable: boolean,
  formationOrder: 0 | 1 | 2 | 3 | 4,
  id: string,
  name: string,
  ap: ConsumableValue,
  life: ConsumableValue,
  skills: Skill[]
}

function updateBattler(
  battler: Battler,
  _inputs: Input[]
): { battler: Battler, commands: Command[] } {
  return {
    battler,
    commands: []
  }
}

type CommandOnProgressState = {
  state: BattleState,
  results: Result[]
}

export function processDecisionPhase(
  state: BattleState
): { state: BattleState, commandQueue: Command[] } {
  let commandQueue: Command[] = []
  // process battlers
  const { inputQueue } = state
  const battlers = state.battlers.map(battler => {
    const inputs = inputQueue.filter(input => input.battlerId === battler.id)
    const { battler: nextBattler, commands } = updateBattler(battler, inputs)
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

export function execCommand(
  state: BattleState,
  _cmd: Command
): CommandOnProgressState {
  return {
    state,
    results: []
  }
}

const initialState: BattleState = {
  inputQueue: [],
  commandQueue: [],
  battlers: [
    {
      side: 'ally',
      formationOrder: 0,
      controllable: true,
      id: 'ally-0',
      name: 'mizchi',
      life: { val: 50, max: 50 },
      ap: { val: 0, max: 15 },
      skills: [
        loadMaster('skill', '$attack'),
        loadMaster('skill', '$power-attack')
      ]
    },
    {
      side: 'enemy',
      formationOrder: 0,
      id: 'enemy-0',
      controllable: false,
      name: 'goblin',
      life: { val: 30, max: 30 },
      ap: { val: 0, max: 10 },
      skills: [loadMaster('skill', '$attack')]
    }
  ],
  turn: 0
}

export function createBattleMock(): BattleState {
  return initialState
}
