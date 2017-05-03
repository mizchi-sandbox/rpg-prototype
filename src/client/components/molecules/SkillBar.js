/* @flow */
import React from 'react'
import type { Skill } from '../../../gen/types'
import Icon from '../atoms/Icon'

export default function SkillBar ({
  skills
}: {
  skills: Skill[]
}) {
  return (
    <span className='skillBar'>
      {
        skills.map(skill => {
          const name = `${skill.displayName}:${skill.actionCost}`
          return <Icon
            key={skill.id}
            name={name}
            onClick={() => {
              console.log(name)
            }
          }/>
        })
      }
    </span>
  )
}
