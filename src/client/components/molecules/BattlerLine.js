/* @flow */
import React from 'react'
import SkillBar from './SkillBar'
import type { Battler } from 'domain/battle'
import type { Skill } from 'domain/types'

export default function BattlerLine({
  battler,
  onSkillSelect
}: {
  battler: Battler,
  onSkillSelect: Skill => void
}) {
  return (
    <div key={battler.name}>
      <span>
        {battler.name}: {battler.life.val} / {battler.life.max}
      </span>
      <span>
        AP: {battler.ap.val} / {battler.ap.max}
      </span>
      <SkillBar skills={battler.skills} onSkillSelect={onSkillSelect} />
    </div>
  )
}
