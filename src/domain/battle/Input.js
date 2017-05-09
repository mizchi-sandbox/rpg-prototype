/* @flow */

export const NO_TARGETED_SKILL = 'NO_TARGETED_SKILL'

export type Input = {|
  type: typeof NO_TARGETED_SKILL,
  id: Symbol,
  battlerId: Symbol,
  skillId: Symbol
|}

export const createNoTargetedSkillInput = (
  battlerId: Symbol,
  skillId: Symbol
) =>
  Object.freeze({
    id: Symbol,
    type: typeof NO_TARGETED_SKILL,
    battlerId,
    skillId
  })
