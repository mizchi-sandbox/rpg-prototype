/* @flow */
import * as CommandResult from '../CommandResult'
import * as BattlerActions from '../Battler'
import type { Battler } from '../Battler'
import type { Skill } from '../Skill'
import type { BattleSession } from '../BattleSession'
import type { CommandApplicationProgress } from '../Command'
import * as RangedValueAction from 'domain/values/RangedValue'
import { pickRandom, updateIn } from 'domain/utils/arrayUtils'

const handleDamageOponentSingleSkill = (
  session: BattleSession,
  actor: Battler,
  skill: Skill,
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
    session.battlers,
    b => b.id === targetId,
    () => damaged
  )
  const skillConsumedBattlers = updateIn(
    battlers,
    b => b.id === actor.id,
    b => BattlerActions.consumeSkillCooldown(b, skill.id)
  )
  return {
    session: { ...session, battlers: skillConsumedBattlers },
    commandResults: [
      {
        type: CommandResult.LOG,
        message: `${actor.displayName} attacked ${target.displayName} : ${damageAmmount} damage`
      }
    ]
  }
}

const planDamageOponentSingleSkill: (
  BattleSession,
  {
    actor: Battler,
    skill: Skill,
    plannedTargetId?: string
  }
) => BattleSession => CommandApplicationProgress = (env, plan) => {
  let plannedTarget: ?Battler = null
  if (plan.plannedTargetId) {
    plannedTarget = env.battlers.find(b => b.id === plan.plannedTargetId)
  }

  const defineRealTarget = (env: BattleSession): ?Battler => {
    if (plannedTarget && BattlerActions.isAlive(plannedTarget)) {
      return plannedTarget
    } else {
      // Pick random oponent
      return pickRandom(
        env.battlers.filter(b => {
          return b.side !== plan.actor.side && BattlerActions.isTargetable(b)
        })
      )
    }
  }

  return (nextEnv: BattleSession) => {
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
        session: nextEnv,
        commandResults: [
          {
            type: CommandResult.LOG,
            message: `${plan.actor.displayName} failed to attack`
          }
        ]
      })
    }
  }
}

export default planDamageOponentSingleSkill
