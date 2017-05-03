/* @flow */
import type { Battler } from '../types'
import { increment, consume } from '../values/ConsumableValue'
import loadMaster from '../loadMaster'

export type ActionQueue = {
  battlerId: string,
  skillId: string
}

// State
export type BattleState = {
  inputQueue: ActionQueue[],
  battlers: Battler[],
  turn: number
}

export function consumeActionQueue (s: BattleState): BattleState {
  return s
}

export function processTurn (s: BattleState): BattleState {
  const inputQueue = []
  const battlers = s.battlers.map(battler => {
    // TODO: Select
    const skill = battler.skills[0]
    if (skill && (skill.actionCost <= battler.ap.val)) {
      inputQueue.push({
        battlerId: battler.id,
        skillId: skill.id
      })
      return {
        ...battler,
        ap: consume(battler.ap, skill.actionCost)
      }
    } else {
      return {
        ...battler,
        ap: increment(battler.ap)
      }
    }
  })
  return { turn: s.turn + 1, battlers, inputQueue }
}

const initialState: BattleState = {
  inputQueue: [],
  battlers: [
    {
      side: 'ally',
      formationOrder: 0,
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
      name: 'goblin',
      life: { val: 30, max: 30 },
      ap: { val: 0, max: 10 },
      skills: [
        loadMaster('skill', '$attack')
      ]
    }
  ],
  turn: 0
}

export function createBattleMock (): BattleState {
  return initialState
}
