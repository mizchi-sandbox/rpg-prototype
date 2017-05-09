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

export function updateBattler(
  battler: Battler,
  inputs: Input[],
  env: BattleState
): { battler: Battler, commands: Command[] } {
  let commands: Command[] = []

  let updatedSkills = isAlive(battler)
    ? battler.skills.map(skill => {
        return BattlerSkillAction.updateCooldownCount(skill)
      })
    : battler.skills

  if (battler.controllable) {
    // Player
    if (inputs.length) {
      for (const input of inputs) {
        updatedSkills = updatedSkills.map(skill => {
          if (
            skill.id === input.skillId &&
            BattlerSkillAction.isExecutable(skill)
          ) {
            commands = commands.concat([
              BattlePlanner.createCommand(env, input.skillId, battler.id)
            ])
            return BattlerSkillAction.resetCooldownCount(skill)
          } else {
            return skill
          }
        })
      }
    }
  } else {
    // AI or BOT
    // Search executable skill
    const executableSkill = updatedSkills.find(s =>
      BattlerSkillAction.isExecutable(s)
    )
    if (executableSkill) {
      updatedSkills = updatedSkills.map(skill => {
        if (skill.id === executableSkill.id) {
          commands = commands.concat([
            BattlePlanner.createCommand(env, skill.id, battler.id)
          ])
          return BattlerSkillAction.resetCooldownCount(skill)
        } else {
          return skill
        }
      })
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
