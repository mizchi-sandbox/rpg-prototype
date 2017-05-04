/* @flow */
import type { ConsumableValue } from 'domain/values/ConsumableValue'
import type { SkillData, SkillId } from 'domain/master'
import { increment } from 'domain/values/ConsumableValue'
import { loadSkillData } from 'domain/master'

export type EmittableSkill = {
  id: Symbol,
  data: SkillData,
  lv: number,
  cooldown: ConsumableValue
}

export function buildEmittableSkill(id: SkillId, lv: number): EmittableSkill {
  const data = loadSkillData(id)
  return {
    data,
    lv,
    id: Symbol(),
    cooldown: {
      val: 0,
      max: data.cooldownCount
    }
  }
}

export function updateCooldownCount(skill: EmittableSkill): EmittableSkill {
  return {
    ...skill,
    cooldown: increment(skill.cooldown)
  }
}
