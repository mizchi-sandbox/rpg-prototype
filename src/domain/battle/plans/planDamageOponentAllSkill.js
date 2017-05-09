/* @flow */
import * as CommandResult from '../CommandResult'
import * as BattlerActions from '../Battler'
import type { Battler } from '../Battler'
import type { BattlerSkill } from '../BattlerSkill'
import type { BattleState } from '../BattleState'
import type { CommandApplicationProgress } from '../Command'
import * as RangedValueAction from 'domain/values/RangedValue'
import { updateIn } from 'domain/utils/arrayUtils'

const handleDamageOponentAllSkill = (
  state: BattleState,
  actor: Battler,
  skill: BattlerSkill,
  targets: Battler[]
): CommandApplicationProgress => {
  // TODO: Calc damage by master
  const damageAmmount = 5
  const targetIds = targets.map(t => t.id)
  let results = []
  const battlers = updateIn(
    state.battlers,
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
    state: { ...state, battlers: skillConsumedBattlers },
    commandResults: results
  }
}

const planDamageOponentAllSkill: (
  BattleState,
  {
    actor: Battler,
    skill: BattlerSkill
  }
) => BattleState => CommandApplicationProgress = (_env, plan) => {
  return (nextEnv: BattleState) => {
    const targets = nextEnv.battlers.filter(b => {
      return b.side !== plan.actor.side && BattlerActions.isTargetable(b)
    })
    return handleDamageOponentAllSkill(nextEnv, plan.actor, plan.skill, targets)
  }
}

export default planDamageOponentAllSkill
