/* @flow */
import React from 'react'
import SkillBar from '../molecules/SkillBar'
import type { Battler } from 'domain/battle'

export default function BattlerLine({ battler }: { battler: Battler }) {
  return (
    <div key={battler.name}>
      <span>
        {battler.name}: {battler.life.val} / {battler.life.max}
      </span>
      <span>
        AP: {battler.ap.val} / {battler.ap.max}
      </span>
      <SkillBar skills={battler.skills} />
    </div>
  )
}
