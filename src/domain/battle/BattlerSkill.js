/* @flow */
import type { ConsumableValue } from 'domain/values/ConsumableValue'
import type { SkillData, SkillId } from 'domain/master'
import { increment } from 'domain/values/ConsumableValue'
import { loadSkillData } from 'domain/master'

export type BattlerSkill = {
  id: Symbol,
  data: SkillData,
  lv: number,
  cooldown: ConsumableValue
}

export function buildBattlerSkill(id: SkillId, lv: number): BattlerSkill {
  const data = loadSkillData(id)
  return Object.freeze({
    data,
    lv,
    id: Symbol('BattlerSkill'),
    cooldown: {
      val: 0,
      max: data.cooldownCount
    }
  })
}

export function updateCooldownCount(skill: BattlerSkill): BattlerSkill {
  return Object.freeze({
    ...skill,
    cooldown: increment(skill.cooldown)
  })
}

export function resetCooldownCount(skill: BattlerSkill): BattlerSkill {
  return Object.freeze({
    ...skill,
    cooldown: {
      val: 0,
      max: skill.data.cooldownCount
    }
  })
}

export function isExecutable(skill: BattlerSkill): boolean {
  return skill.cooldown.val >= skill.cooldown.max
}
