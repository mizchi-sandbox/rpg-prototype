/* @flow */
import type { Battler } from '../types'
import { increment, consume } from '../values/ConsumableValue'

export type ActionQueue = {
  battlerId: string,
  skillId: string
}

// State
export type BattleState = {
  actionQueue: ActionQueue[],
  battlers: Battler[],
  turn: number
}

export function consumeActionQueue (s: BattleState): BattleState {
  return s
}

export function processTurn (s: BattleState): BattleState {
  const actionQueue = []
  const battlers = s.battlers.map(battler => {
    // TODO: Select
    const skill = battler.skills[0]
    if (skill && (skill.actionCost <= battler.ap.val)) {
      // debugger
      actionQueue.push({
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
  return { turn: s.turn + 1, battlers, actionQueue }
}
