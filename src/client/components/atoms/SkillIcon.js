/* @flow */
import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import type { BattlerSkill } from 'domain/battle'

const { sin, cos, PI } = Math
const arcPath = (
  percent,
  cx: number,
  cy: number,
  r: number,
  reversed: 0 | 1 = 1
) => {
  const axisRotation = percent > 0.5 ? 1 : 0
  return `
    M ${cx} ${cy - r}
    A ${r} ${r}, ${axisRotation}, ${axisRotation}, ${reversed}, ${cx + sin(percent * PI * 2) * r} ${cy - cos(percent * PI * 2) * r}
  `
}

export default function SkillIcon(props: {
  skill: BattlerSkill,
  onClick: Function
}) {
  const rad = props.skill.cooldown.val / props.skill.cooldown.max
  const filled = rad >= 1
  return (
    <span
      className={css(styles.red)}
      onClick={ev => {
        props.onClick(ev)
      }}
      style={{ width: '30px', height: '30px' }}
    >
      <svg x="0" y="0" width="30px" height="30px" viewBox="0 0 100 100">
        {filled
          ? <circle
              cx={50}
              cy={50}
              r={42}
              stroke="blue"
              strokeWidth={4}
              fill="transparent"
            />
          : [
              <path
                d={arcPath(rad, 50, 50, 40)}
                fill="none"
                stroke="blue"
                strokeWidth={3}
              />,
              <circle
                cx={50}
                cy={50}
                r={42}
                stroke="grey"
                strokeWidth={1}
                fill="transparent"
              />
            ]}
        <text
          x="50"
          y="50"
          fill="green"
          textAnchor="middle"
          style={{ fontSize: '2em' }}
        >
          {props.skill.data.displayName}
        </text>
      </svg>
    </span>
  )
}

const styles = StyleSheet.create({
  red: {
    padding: '3px'
    // outline: '1px solid black'
  }
})
