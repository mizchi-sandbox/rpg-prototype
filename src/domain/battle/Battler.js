/* @flow */
import * as BattlerSkillAction from './BattlerSkill'
import * as CommandResult from './CommandResult'
import type { BattlerSkill } from './BattlerSkill'
import type { BattleState } from './BattleState'
import type { Command, Input } from './index'
import * as RangedValueAction from 'domain/values/RangedValue'
import type { RangedValue } from 'domain/values/RangedValue'
import type { MonsterData } from 'domain/master'

export type Battler = {
  side: 'ally' | 'enemy',
  controllable: boolean,
  formationOrder: 0 | 1 | 2 | 3 | 4,
  id: Symbol,
  name: string,
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

export function createCommand(
  skillId: Symbol,
  actorId: Symbol,
  plannedTargetId?: Symbol
): Command {
  return (env: BattleState) => {
    const actor: ?Battler = env.battlers.find(b => b.id === actorId)
    const skill = actor && actor.skills.find(s => s.id === skillId)
    if (actor && skill && skill.data) {
      switch (skill.data.skillType) {
        case 'DAMAGE_OPONENT_SINGLE':
          let target: ?Battler
          if (plannedTargetId) {
            target = env.battlers.find(b => b.id === plannedTargetId)
          } else {
            target = env.battlers.find(b => {
              return b.side !== actor.side && b.life.val > 0
            })
          }
          if (target) {
            // TODO: Calc damage by master
            const damageAmmount = 5
            const damaged: Battler = {
              ...target,
              life: RangedValueAction.sub(target.life, damageAmmount)
            }
            const battlers = env.battlers.map(
              b => (target && b.id === target.id ? damaged : b)
            )
            return {
              state: { ...env, battlers },
              commandResults: [
                {
                  type: CommandResult.LOG,
                  message: `${actor.name} attacked ${target.name} : ${damageAmmount} damage`
                }
              ]
            }
          } else {
            return Object.freeze({
              state: env,
              commandResults: [
                {
                  type: CommandResult.LOG,
                  message: `${actor.name} failed to attack`
                }
              ]
            })
          }
        default:
          return Object.freeze({
            state: env,
            commandResults: []
          })
      }
    } else {
      return Object.freeze({
        state: env,
        commandResults: []
      })
    }
  }
}

export function updateBattler(
  battler: Battler,
  inputs: Input[],
  _env: BattleState
): { battler: Battler, commands: Command[] } {
  let commands: Command[] = []

  let updatedSkills = battler.skills.map(skill => {
    return BattlerSkillAction.updateCooldownCount(skill)
  })

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
              createCommand(input.skillId, battler.id)
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
          commands = commands.concat([createCommand(skill.id, battler.id)])
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
