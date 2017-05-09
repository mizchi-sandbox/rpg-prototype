/* @flow */
import type { SkillId } from 'domain/master'

export type Actor = {
  id: string,
  displayName: string,
  controllable: boolean,
  lifeValue: number,
  acquiredSkills: AcquiredSkill[]
}

export type AcquiredSkill = {
  skillId: SkillId,
  lv: number
}
