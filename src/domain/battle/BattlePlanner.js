/* @flow */
import planDamageOponentSingleSkill from './plans/planDamageOponentSingleSkill'
import planDamageOponentAllSkill from './plans/planDamageOponentAllSkill'
import planHealSelfSkill from './plans/planHealSelfSkill'
import type { BattleState } from './BattleState'
import type { Command, CommandApplicationProgress } from './Command'

type CommandPlan = (next: BattleState) => CommandApplicationProgress

export function createCommandPlan(
  prevEnv: BattleState,
  skillId: Symbol,
  actorId: Symbol,
  plannedTargetId?: Symbol
): ?CommandPlan {
  const actor = prevEnv.battlers.find(b => b.id === actorId)
  const skill = actor && actor.skills.find(s => s.id === skillId)
  if (actor && skill && skill.data) {
    switch (skill.data.skillType) {
      case 'DAMAGE_OPONENT_SINGLE':
        return planDamageOponentSingleSkill(prevEnv, {
          actor,
          skill,
          plannedTargetId
        })
      case 'DAMAGE_OPONENT_ALL':
        return planDamageOponentAllSkill(prevEnv, {
          actor,
          skill
        })
      case 'HEAL_SELF':
        return planHealSelfSkill(prevEnv, {
          actor,
          skill
        })
    }
  }
  // TODO: Assert or throw
  return null
}

export function createCommand(
  prevEnv: BattleState,
  skillId: Symbol,
  actorId: Symbol,
  plannedTargetId?: Symbol
): Command {
  const plan = createCommandPlan(prevEnv, skillId, actorId, plannedTargetId)
  return nextEnv => {
    if (plan) {
      return plan(nextEnv)
    } else {
      return {
        state: nextEnv,
        commandResults: []
      }
    }
  }
}
