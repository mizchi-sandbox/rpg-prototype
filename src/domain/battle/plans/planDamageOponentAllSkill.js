/* @flow */
import * as CommandResult from '../CommandResult'
import * as BattlerActions from '../Battler'
import type { Battler } from '../Battler'
import type { Skill } from '../Skill'
import type { BattleSession } from '../BattleSession'
import type { CommandApplicationProgress } from '../Command'
import * as RangedValueAction from 'domain/values/RangedValue'
import { updateIn } from 'domain/utils/arrayUtils'

const handleDamageOponentAllSkill = (
  session: BattleSession,
  actor: Battler,
  skill: Skill,
  targets: Battler[]
): CommandApplicationProgress => {
  // TODO: Calc damage by master
  const damageAmmount = 5
  const targetIds = targets.map(t => t.id)
  let results = []
  const battlers = updateIn(
    session.battlers,
    b => targetIds.includes(b.id),
    target => {
      results = results.concat({
        type: CommandResult.LOG,
        message: `${actor.displayName} exec ${skill.data.displayName} to ${target.displayName} : ${damageAmmount} damage`
      })
      return {
        ...target,
        life: RangedValueAction.sub(target.life, damageAmmount)
      }
    }
  )
  const skillConsumedBattlers = updateIn(
    battlers,
    b => b.id === actor.id,
    b => BattlerActions.consumeSkillCooldown(b, skill.id)
  )
  return {
    session: { ...session, battlers: skillConsumedBattlers },
    commandResults: results
  }
}

const planDamageOponentAllSkill: (
  BattleSession,
  {
    actor: Battler,
    skill: Skill
  }
) => BattleSession => CommandApplicationProgress = (_env, plan) => {
  return (nextEnv: BattleSession) => {
    const targets = nextEnv.battlers.filter(b => {
      return b.side !== plan.actor.side && BattlerActions.isTargetable(b)
    })
    return handleDamageOponentAllSkill(nextEnv, plan.actor, plan.skill, targets)
  }
}

export default planDamageOponentAllSkill
