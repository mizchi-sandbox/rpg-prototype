/* @flow */
import React from 'react'
import Icon from '../atoms/Icon'
import type { Skill } from 'domain/types'

export default function SkillBar({
  skills,
  onSkillSelect
}: {
  skills: Skill[],
  onSkillSelect: Skill => void
}) {
  return (
    <span className="skillBar">
      {skills.map(skill => {
        const name = `${skill.displayName}:${skill.actionCost}`
        return (
          <Icon
            key={skill.id}
            name={name}
            onClick={() => {
              onSkillSelect(skill)
            }}
          />
        )
      })}
    </span>
  )
}
