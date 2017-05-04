/* @flow */
import React from 'react'
import SkillBar from './SkillBar'
import type { Battler } from 'domain/battle'
import type { EmittableSkill } from 'domain/battle'

export default function BattlerLine({
  battler,
  onSkillSelect
}: {
  battler: Battler,
  onSkillSelect: EmittableSkill => void
}) {
  return (
    <div key={battler.name}>
      <span>
        {battler.name}: {battler.life.val} / {battler.life.max}
      </span>
      <SkillBar skills={battler.skills} onSkillSelect={onSkillSelect} />
    </div>
  )
}
