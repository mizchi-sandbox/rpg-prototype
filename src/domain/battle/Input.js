/* @flow */
import uuid from 'uuid'

export const NO_TARGETED_SKILL = 'NO_TARGETED_SKILL'

export type Input = {|
  type: typeof NO_TARGETED_SKILL,
  id: string,
  battlerId: string,
  skillId: string
|}

export const createNoTargetedSkillInput = (
  battlerId: string,
  skillId: string
) =>
  Object.freeze({
    id: uuid(),
    type: typeof NO_TARGETED_SKILL,
    battlerId,
    skillId
  })
