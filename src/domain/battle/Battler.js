/* @flow */
import * as SkillAction from './Skill'
import * as CommandPlanner from './CommandPlanner'
import type { Skill } from './Skill'
import type { BattleSession } from './BattleSession'
import type { Command, Input } from './index'
import type { RangedValue } from 'domain/values/RangedValue'
import type { MonsterData } from 'domain/master'

export type Battler = {
  side: 'ally' | 'enemy',
  controllable: boolean,
  formationOrder: number,
  id: string,
  displayName: string,
  life: RangedValue,
  monsterData?: MonsterData,
  skills: Skill[]
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

export const consumeSkillCooldown: (Battler, string) => Battler = (
  battler,
  skillId
) => {
  return {
    ...battler,
    skills: battler.skills.map(s => {
      if (s.id === skillId) {
        return SkillAction.resetCooldownCount(s)
      } else {
        return s
      }
    })
  }
}

export function updateBattlerState(battler: Battler): Battler {
  // update cooldown
  const updatedSkills = isAlive(battler)
    ? battler.skills.map(s => SkillAction.updateCooldownCount(s))
    : battler.skills
  return { ...battler, skills: updatedSkills }
}

export function planNextCommand(
  battler: Battler,
  inputs: Input[],
  env: BattleSession
): Command[] {
  let commands: Command[] = []

  if (battler.controllable) {
    // Player
    if (inputs.length) {
      for (const input of inputs) {
        const cs = battler.skills.reduce((commands, skill) => {
          if (skill.id === input.skillId && SkillAction.isExecutable(skill)) {
            return commands.concat([
              CommandPlanner.createCommand(env, input.skillId, battler.id)
            ])
          } else {
            return commands
          }
        }, [])
        commands = commands.concat(cs)
      }
    }
  } else {
    // AI or BOT
    // Search executable skill
    const executableSkill = battler.skills.find(s =>
      SkillAction.isExecutable(s)
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
