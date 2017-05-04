/* @flow */
import * as BattlerSkillAction from './BattlerSkill'
import * as Result from './Result'
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

export function createCommand(
  skillId: Symbol,
  actorId: Symbol,
  plannedTargetId?: Symbol
): Command {
  return (env: BattleState) => {
    const actor = env.battlers.find(b => b.id === actorId)
    const skill = actor && actor.skills.find(s => s.id === skillId)
    if (actor && skill && skill.data) {
      switch (skill.data.id) {
        case '$attack':
        case '$power-attack':
          let target: ?Battler
          if (plannedTargetId) {
            target = env.battlers.find(b => b.id === plannedTargetId)
          } else {
            target = env.battlers.find(b => {
              return b.side !== actor.side
            })
          }
          if (target) {
            const damaged = {
              ...target,
              life: { ...target.life, val: target.life.val - 5 }
            }
            const battlers = env.battlers.map(
              b => (target && b.id === target.id ? damaged : b)
            )
            return {
              state: { ...env, battlers },
              results: [
                {
                  type: Result.LOG,
                  message: `${actor.name} attacked ${target.name} : 5 damage`
                }
              ]
            }
          } else {
            throw new Error('attacking target does not exist')
          }
        default:
          return {
            state: env,
            results: []
          }
      }
    } else {
      return {
        state: env,
        results: []
      }
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
        console.log(battler.id, input)
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
  return {
    battler: {
      ...battler,
      skills: updatedSkills
    },
    commands
  }
}
