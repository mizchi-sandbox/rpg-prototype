/* @flow */
import planDamageOponentSingleSkill from './plans/planSingleDamegeOponentSkill'
import type { Battler } from './Battler'
import type { BattleState } from './BattleState'
import type { Command } from './Command'

export function createCommand(
  prevEnv: BattleState,
  skillId: Symbol,
  actorId: Symbol,
  plannedTargetId?: Symbol
): Command {
  const actor: ?Battler = prevEnv.battlers.find(b => b.id === actorId)
  const skill = actor && actor.skills.find(s => s.id === skillId)

  return nextEnv => {
    // return (env: BattleState) => {
    if (actor && skill && skill.data) {
      switch (skill.data.skillType) {
        case 'DAMAGE_OPONENT_SINGLE':
          return planDamageOponentSingleSkill(prevEnv, {
            actor,
            skill,
            plannedTargetId
          })(nextEnv)
        default:
          return Object.freeze({
            state: nextEnv,
            commandResults: []
          })
      }
    } else {
      return {
        state: nextEnv,
        commandResults: []
      }
    }
  }
  // }
}
