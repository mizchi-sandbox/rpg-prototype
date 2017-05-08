/* @flow */
import * as BattlerSkillAction from './BattlerSkill'
import * as CommandResult from './CommandResult'
import type { BattlerSkill } from './BattlerSkill'
import type { BattleState } from './BattleState'
import type { Command, Input } from './index'
import type { CommandApplicationProgress } from './Command'
import * as RangedValueAction from 'domain/values/RangedValue'
import type { RangedValue } from 'domain/values/RangedValue'
import type { MonsterData } from 'domain/master'
import { pickRandom, updateIn } from 'domain/utils/arrayUtils'

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

export const isAlive = (battler: Battler): boolean => {
  return battler.life.val > 0
}

export const isTargetable = (battler: Battler): boolean => {
  return isAlive(battler)
}

export function updateBattler(
  battler: Battler,
  inputs: Input[],
  _env: BattleState
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

export const planDamageOponentSingleSkill: (
  BattleState,
  {
    actor: Battler,
    skill: BattlerSkill,
    plannedTargetId?: Symbol
  }
) => BattleState => CommandApplicationProgress = (env, plan) => {
  let plannedTarget: ?Battler = null
  if (plan.plannedTargetId) {
    plannedTarget = env.battlers.find(b => b.id === plan.plannedTargetId)
  }

  const defineRealTarget = (env: BattleState): ?Battler => {
    if (plannedTarget && isAlive(plannedTarget)) {
      return plannedTarget
    } else {
      // Pick random oponent
      return pickRandom(
        env.battlers.filter(b => {
          return b.side !== plan.actor.side && isTargetable(b)
        })
      )
    }
  }

  return (nextEnv: BattleState) => {
    const target = defineRealTarget(nextEnv)
    if (target) {
      return handleDamageOponentSingleSkill(
        nextEnv,
        plan.actor,
        plan.skill,
        target
      )
    } else {
      return Object.freeze({
        state: nextEnv,
        commandResults: [
          {
            type: CommandResult.LOG,
            message: `${plan.actor.name} failed to attack`
          }
        ]
      })
    }
  }
}

export const handleDamageOponentSingleSkill = (
  state: BattleState,
  actor: Battler,
  skill: BattlerSkill,
  target: Battler
): CommandApplicationProgress => {
  // TODO: Calc damage by master
  const damageAmmount = 5
  const damaged: Battler = {
    ...target,
    life: RangedValueAction.sub(target.life, damageAmmount)
  }
  const targetId = target && target.id
  const battlers = updateIn(
    state.battlers,
    b => b.id === targetId,
    () => damaged
  )
  return {
    state: { ...state, battlers },
    commandResults: [
      {
        type: CommandResult.LOG,
        message: `${actor.name} attacked ${target.name} : ${damageAmmount} damage`
      }
    ]
  }
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
          const planned = planDamageOponentSingleSkill(env, {
            actor,
            skill,
            plannedTargetId
          })
          return planned(env)
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
