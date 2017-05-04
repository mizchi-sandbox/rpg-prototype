/* @flow */
import * as BattlerSkillAction from './BattlerSkill'
import type { BattlerSkill } from './BattlerSkill'
import type { BattleState } from './BattleState'
import type { Input, Command } from './index'
import type { ConsumableValue } from 'domain/values/ConsumableValue'

export type Battler = {
  side: 'ally' | 'enemy',
  controllable: boolean,
  formationOrder: 0 | 1 | 2 | 3 | 4,
  id: Symbol,
  name: string,
  life: ConsumableValue,
  skills: BattlerSkill[]
}

export function updateBattler(
  battler: Battler,
  inputs: Input[],
  env: BattleState
): { battler: Battler, commands: Command[] } {
  let commands: Command[] = []
  let self: Battler = battler

  if (battler.controllable) {
    // Player
    if (inputs.length) {
      for (const input of inputs) {
        console.log(battler.id, input)
      }
    }
  } else {
    // AI or BOT
    // Search executable skill
    const executableSkill = battler.skills.find(s =>
      BattlerSkillAction.isExecutable(s)
    )

    if (executableSkill) {
      // if (target) {
      //
      // }

      // Consume point to exec
      const skills = self.skills.map(skill => {
        if (skill.id === executableSkill.id) {
          const target = env.battlers.find(b => b.side !== battler)
          commands = commands.concat([
            {
              id: Symbol(),
              skillId: executableSkill.id,
              actorId: self.id,
              targetId: target && target.id
            }
          ])
          return {
            ...skill,
            cooldown: {
              val: 0,
              max: skill.data.cooldownCount
            }
          }
        } else {
          return skill
        }
      })
      self = {
        ...self,
        skills: skills
      }
    }
  }
  const updatedSkills = self.skills.map(skill => {
    return BattlerSkillAction.updateCooldownCount(skill)
  })

  return {
    battler: {
      ...self,
      skills: updatedSkills
    },
    commands
  }
}
