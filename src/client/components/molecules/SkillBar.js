/* @flow */
import React from 'react'
import SkillIcon from '../atoms/SkillIcon'
import type { EmittableSkill } from 'domain/battle'

export default function SkillBar({
  skills,
  onSkillSelect
}: {
  skills: EmittableSkill[],
  onSkillSelect: EmittableSkill => void
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
