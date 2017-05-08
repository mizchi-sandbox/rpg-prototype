/* @flow */
import * as CommandResult from '../CommandResult'
import * as BattlerActions from '../Battler'
import type { Battler } from '../Battler'
import type { BattlerSkill } from '../BattlerSkill'
import type { BattleState } from '../BattleState'
import type { CommandApplicationProgress } from '../Command'
import * as RangedValueAction from 'domain/values/RangedValue'
import { pickRandom, updateIn } from 'domain/utils/arrayUtils'

const handleDamageOponentSingleSkill = (
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

const planDamageOponentSingleSkill: (
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

export default planDamageOponentSingleSkill