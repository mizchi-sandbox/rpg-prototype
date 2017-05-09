/* @flow */
import * as BattlerSkillAction from './BattlerSkill'
import * as BattlePlanner from './BattlePlanner'
import type { BattlerSkill } from './BattlerSkill'
import type { BattleState } from './BattleState'
import type { Command, Input } from './index'
import type { RangedValue } from 'domain/values/RangedValue'
import type { MonsterData } from 'domain/master'

export type Battler = {
  side: 'ally' | 'enemy',
  controllable: boolean,
  formationOrder: number,
  id: Symbol,
  displayName: string,
  life: RangedValue,
  monsterData?: MonsterData,
  skills: BattlerSkill[]
}

export type AllyBattler = Battler & {
  monsterData: void
}

export type EnemyBattler = Battler & {
  monsterData: MonsterData
}

export const isAlive = (battler: Battler): boolean => {
  return battler.life.val > 0
}

export const isTargetable = (battler: Battler): boolean => {
  return isAlive(battler)
}

export const consumeSkillCooldown: (Battler, Symbol) => Battler = (
  battler,
  skillId
) => {
  return {
    ...battler,
    skills: battler.skills.map(s => {
      if (s.id === skillId) {
        return BattlerSkillAction.resetCooldownCount(s)
      } else {
        return s
      }
    })
  }
}

export function updateBattler(
  battler: Battler,
  inputs: Input[],
  env: BattleState
): { battler: Battler, commands: Command[] } {
  let commands: Command[] = []

  const updatedSkills = isAlive(battler)
    ? battler.skills.map(s => BattlerSkillAction.updateCooldownCount(s))
    : battler.skills

  if (battler.controllable) {
    // Player
    if (inputs.length) {
      for (const input of inputs) {
        commands = updatedSkills.reduce((commands, skill) => {
          if (
            skill.id === input.skillId &&
            BattlerSkillAction.isExecutable(skill)
          ) {
            return commands.concat([
              BattlePlanner.createCommand(env, input.skillId, battler.id)
            ])
          } else {
            return commands
          }
        }, [])
      }
    }
  } else {
    // AI or BOT
    // Search executable skill
    const executableSkill = updatedSkills.find(s =>
      BattlerSkillAction.isExecutable(s)
    )
    if (executableSkill) {
      commands = updatedSkills.reduce((commands, skill) => {
        if (skill.id === executableSkill.id) {
          return commands.concat([
            BattlePlanner.createCommand(env, skill.id, battler.id)
          ])
        } else {
          return commands
        }
      }, [])
    }
  }
  return Object.freeze({
    battler: {
      ...battler,
      skills: updatedSkills
    },
    commands
  })
}
