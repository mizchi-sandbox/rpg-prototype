/* @flow */
import * as CommandResult from '../CommandResult'
import * as BattlerActions from '../Battler'
import type { Battler } from '../Battler'
import type { Skill } from '../Skill'
import type { BattleState } from '../BattleState'
import type { CommandApplicationProgress } from '../Command'
import * as RangedValueAction from 'domain/values/RangedValue'
import { updateIn } from 'domain/utils/arrayUtils'

const handleHealSelfSkill = (
  state: BattleState,
  actor: Battler,
  skill: Skill
): CommandApplicationProgress => {
  // TODO: Calc damage by master
  const healAmmount = 5
  let results = []
  const battlers = updateIn(
    state.battlers,
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
    state: { ...state, battlers: skillConsumedBattlers },
    commandResults: results
  }
}

const planHealSelfSkill: (
  BattleState,
  {
    actor: Battler,
    skill: Skill
  }
) => BattleState => CommandApplicationProgress = (_env, plan) => {
  return (nextEnv: BattleState) => {
    const targets = nextEnv.battlers.filter(b => {
      return b.side !== plan.actor.side && BattlerActions.isTargetable(b)
    })
    return handleHealSelfSkill(nextEnv, plan.actor, plan.skill, targets)
  }
}

export default planHealSelfSkill
