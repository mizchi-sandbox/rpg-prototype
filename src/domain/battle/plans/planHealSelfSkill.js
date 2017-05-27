/* @flow */
import * as CommandResult from '../CommandResult'
import * as BattlerActions from '../Battler'
import type { Battler } from '../Battler'
import type { Skill } from '../Skill'
import type { BattleSession } from '../BattleSession'
import type { CommandApplicationProgress } from '../Command'
import * as RangedValueAction from 'domain/values/RangedValue'
import { updateIn } from 'domain/utils/arrayUtils'

const handleHealSelfSkill = (
  session: BattleSession,
  actor: Battler,
  skill: Skill
): CommandApplicationProgress => {
  // TODO: Calc damage by master
  const healAmmount = 5
  let results = []
  const battlers = updateIn(
    session.battlers,
    b => b.id === actor.id,
    target => {
      results = results.concat({
        type: CommandResult.LOG,
        message: `${actor.displayName} exec ${skill.data.displayName}: ${healAmmount} healed`
      })
      return {
        ...target,
        life: RangedValueAction.add(target.life, healAmmount)
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

const planHealSelfSkill: (
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
    return handleHealSelfSkill(nextEnv, plan.actor, plan.skill)
  }
}

export default planHealSelfSkill
