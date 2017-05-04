/* @flow */
import type { Input, Command } from './index'
import type { ConsumableValue } from 'domain/values/ConsumableValue'
import type { Skill } from 'domain/types'

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

export function updateBattler(
  battler: Battler,
  inputs: Input[]
): { battler: Battler, commands: Command[] } {
  if (inputs.length) {
    console.log(battler.id, inputs)
  }
  return {
    battler,
    commands: []
  }
}
