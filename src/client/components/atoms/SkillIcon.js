/* @flow */
import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import type { EmittableSkill } from 'domain/battle'

export default function SkillIcon(props: {
  skill: EmittableSkill,
  onClick: Function
}) {
  return (
    <span
      className={css(styles.red)}
      onClick={ev => {
        props.onClick(ev)
      }}
    >
      {props.skill.data.displayName}
      {props.skill.cooldown.val}/{props.skill.cooldown.max}
    </span>
  )
}

const styles = StyleSheet.create({
  red: {
    padding: '3px',
    outline: '1px solid black'
  }
})
