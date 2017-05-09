/* @flow */
import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import SkillIcon from '../atoms/SkillIcon'
import type { Skill } from 'domain/battle'

export default function SkillBar({
  skillSelectCursor,
  y,
  skills,
  onSkillSelect,
  isSkillInQueue
}: {
  skillSelectCursor: ?{ x: number, y: number },
  y: number,
  skills: Skill[],
  onSkillSelect: Skill => void,
  isSkillInQueue: Skill => boolean
}) {
  return (
    <span className={css(styles.container)}>
      {skills.map((skill, index) => {
        const x = index
        const focused: boolean =
          !!skillSelectCursor && skillSelectCursor.x === x && skillSelectCursor.y === y
        return (
          <div key={index}>
            <span className={css(styles.skillSlot)}>
              <SkillIcon
                focused={focused}
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
