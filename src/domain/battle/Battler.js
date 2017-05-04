/* @flow */
import { updateCooldownCount } from './BattlerSkill'
import type { BattlerSkill } from './BattlerSkill'
import type { Input, Command } from './index'
import type { ConsumableValue } from 'domain/values/ConsumableValue'

export type Battler = {
  side: 'ally' | 'enemy',
  controllable: boolean,
  formationOrder: 0 | 1 | 2 | 3 | 4,
  id: string,
  name: string,
  life: ConsumableValue,
  skills: BattlerSkill[]
}

export function updateBattler(
  battler: Battler,
  inputs: Input[]
): { battler: Battler, commands: Command[] } {
  if (battler.controllable) {
    // Player
    if (inputs.length) {
      for (const input of inputs) {
        console.log(battler.id, input)
      }
    }
  } else {
    // AI or BOT
  }
  const updatedSkills = battler.skills.map(skill => {
    return updateCooldownCount(skill)
  })

  return {
    battler: {
      ...battler,
      skills: updatedSkills
    },
    commands: []
  }
}
