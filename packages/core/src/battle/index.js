/* @flow */
import type { Battler } from '../types'
import { increment } from '../values/ConsumableValue'

// State
export type BattleState = {
  allies: Battler[],
  enemies: Battler[],
  turn: number
}

// domain code
export function processButtler (battler: Battler): Battler {
  return {
    ...battler,
    ap: increment(battler.ap)
  }
}

export function processTurn (s: BattleState): BattleState {
  const allies = s.allies.map(processButtler)
  const enemies = s.enemies.map(processButtler)
  return { turn: s.turn + 1, allies, enemies }
}
