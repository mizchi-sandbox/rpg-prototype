/* @flow */
import React from 'react'
import SkillIcon from '../atoms/SkillIcon'
import { StyleSheet, css } from 'aphrodite'
import type { BattlerSkill } from 'domain/battle'

export default function SkillBar({
  skills,
  onSkillSelect
}: {
  skills: BattlerSkill[],
  onSkillSelect: BattlerSkill => void
}) {
  return (
    <span className={css(styles.container)}>
      {skills.map(skill => {
        return (
          <span className={css(styles.skillSlot)}>
            <SkillIcon
              key={skill.data.id}
              skill={skill}
              onClick={() => {
                onSkillSelect(skill)
              }}
            />
          </span>
        )
      })}
    </span>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  },
  skillSlot: {}
})
