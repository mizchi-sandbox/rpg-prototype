/* @flow */
import React from 'react'
import SkillIcon from '../atoms/SkillIcon'
import type { BattlerSkill } from 'domain/battle'

export default function SkillBar({
  skills,
  onSkillSelect
}: {
  skills: BattlerSkill[],
  onSkillSelect: BattlerSkill => void
}) {
  return (
    <span className="skillBar">
      {skills.map(skill => {
        return (
          <SkillIcon
            key={skill.data.id}
            skill={skill}
            onClick={() => {
              onSkillSelect(skill)
            }}
          />
        )
      })}
    </span>
  )
}
