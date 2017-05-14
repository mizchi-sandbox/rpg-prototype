/* @flow */
import uuid from 'uuid'
import type { RangedValue } from 'domain/values/RangedValue'
import type { SkillData, SkillId } from 'domain/master'
import { increment } from 'domain/values/RangedValue'
import { loadSkillData } from 'domain/master'

export type Skill = {
  id: string, // FIXIT: can not seriarize to send
  data: SkillData,
  lv: number,
  cooldown: RangedValue
}

export function buildSkill(id: SkillId, lv: number): Skill {
  const data = loadSkillData(id)
  return Object.freeze({
    data,
    lv,
    id: uuid(),
    cooldown: {
      val: 0,
      max: data.cooldownCount
    }
  })
}

export function updateCooldownCount(skill: Skill): Skill {
  return Object.freeze({
    ...skill,
    cooldown: increment(skill.cooldown)
  })
}

export function resetCooldownCount(skill: Skill): Skill {
  return Object.freeze({
    ...skill,
    cooldown: {
      val: 0,
      max: skill.data.cooldownCount
    }
  })
}

export function isExecutable(skill: Skill): boolean {
  return skill.cooldown.val >= skill.cooldown.max
}
