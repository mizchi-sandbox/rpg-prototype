/* @flow */
import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import SkillIcon from '../atoms/SkillIcon'
import type { BattlerSkill } from 'domain/battle'

export default function SkillBar({
  skills,
  onSkillSelect,
  isSkillInQueue
}: {
  skills: BattlerSkill[],
  onSkillSelect: BattlerSkill => void,
  isSkillInQueue: BattlerSkill => boolean
}) {
  return (
    <span className={css(styles.container)}>
      {skills.map((skill, index) => {
        return (
          <div key={index}>
            <span className={css(styles.skillSlot)}>
              <SkillIcon
                skill={skill}
                inQueue={isSkillInQueue(skill)}
                onClick={() => {
                  onSkillSelect(skill)
                }}
              />
            </span>
          </div>
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
