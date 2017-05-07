/* @flow */
import { loadMonsterData } from '../master'
import { updateBattler } from './Battler'
import { buildBattlerSkill } from './BattlerSkill'
import type { Battler } from './Battler'
import type { Command, CommandApplicationProgress } from './Command'
import type { CommandResult } from './CommandResult'
import type { Input } from './Input'

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

export function isFinished(state: BattleState): ?{ winner: 'ally' | 'enemy' } {
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

const initialState: BattleState = {
  inputQueue: [],
  battlers: [
    {
      id: Symbol('ally'),
      side: 'ally',
      formationOrder: 0,
      controllable: true,
      name: 'Player1',
      life: { val: 150, max: 150 },
      skills: [
        buildBattlerSkill('$attack', 1),
        buildBattlerSkill('$power-attack', 1)
      ]
    },
    {
      id: Symbol('ally'),
      side: 'ally',
      formationOrder: 1,
      controllable: false,
      name: 'BOT1',
      life: { val: 30, max: 30 },
      skills: [buildBattlerSkill('$attack', 1)]
    },
    {
      id: Symbol('enemy'),
      side: 'enemy',
      monsterData: loadMonsterData('$goblin'),
      formationOrder: 0,
      controllable: false,
      name: 'goblin',
      life: { val: 30, max: 30 },
      skills: [buildBattlerSkill('$attack', 1)]
    },
    {
      id: Symbol('enemy'),
      side: 'enemy',
      monsterData: loadMonsterData('$hob-goblin'),
      formationOrder: 0,
      controllable: false,
      name: 'goblin',
      life: { val: 45, max: 45 },
      skills: [buildBattlerSkill('$attack', 1)]
    }
  ],
  turn: 0
}

export function createBattleMock(): BattleState {
  return initialState
}
