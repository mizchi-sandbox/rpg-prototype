/* @flow */
import * as BattlerSkillAction from './BattlerSkill'
import * as CommandPlanner from './CommandPlanner'
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

export function updateBattlerState(battler: Battler): Battler {
  // update cooldown
  const updatedSkills = isAlive(battler)
    ? battler.skills.map(s => BattlerSkillAction.updateCooldownCount(s))
    : battler.skills
  return { ...battler, skills: updatedSkills }
}

export function planNextCommand(
  battler: Battler,
  inputs: Input[],
  env: BattleState
): Command[] {
  let commands: Command[] = []

  if (battler.controllable) {
    // Player
    if (inputs.length) {
      for (const input of inputs) {
        commands = battler.skills.reduce((commands, skill) => {
          if (
            skill.id === input.skillId &&
            BattlerSkillAction.isExecutable(skill)
          ) {
            return commands.concat([
              CommandPlanner.createCommand(env, input.skillId, battler.id)
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
    const executableSkill = battler.skills.find(s =>
      BattlerSkillAction.isExecutable(s)
    )
    if (executableSkill) {
      commands = battler.skills.reduce((commands, skill) => {
        if (skill.id === executableSkill.id) {
          return commands.concat([
            CommandPlanner.createCommand(env, skill.id, battler.id)
          ])
        } else {
          return commands
        }
      }, [])
    }
  }
  return commands
}
