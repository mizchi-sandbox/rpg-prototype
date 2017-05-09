/* @flow */
import React from 'react'
// import { StyleSheet, css } from 'aphrodite'
import Tooltip from 'react-tooltip'
import type { Skill } from 'domain/battle'

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

export default function SkillIcon({
  skill,
  inQueue,
  onClick
}: {
  skill: Skill,
  inQueue: boolean,
  onClick: Function
}) {
  const rad = skill.cooldown.val / skill.cooldown.max
  const filled = rad >= 1
  const tooltipId = `skillName${skill.data.displayName}`
  const size = 40
  return (
    <span style={{ width: `${size}px`, height: `${size}px` }} onClick={onClick}>
      <Tooltip id={tooltipId} place="top" type="dark" effect="solid">
        {skill.data.displayName}
      </Tooltip>
      <svg
        data-tip
        data-for={tooltipId}
        x="0"
        y="0"
        width="40px"
        height="40px"
        viewBox="0 0 100 100"
      >
        {filled
          ? <circle
              key="filledCircle"
              cx={50}
              cy={50}
              r={42}
              stroke={inQueue ? 'yellow' : 'green'}
              strokeWidth={6}
              fill="transparent"
            />
          : [
              <path
                key="progress"
                d={arcPath(rad, 50, 50, 40)}
                fill="none"
                stroke="blue"
                strokeWidth={3}
              />,
              <circle
                key="grayout"
                cx={50}
                cy={50}
                r={42}
                stroke="grey"
                strokeWidth={1}
                fill="transparent"
              />
            ]}
        {skill.data.displayIcon
          ? <image
              xlinkHref={skill.data.displayIcon}
              x="25"
              y="25"
              height="50"
              width="50"
              style={{
                filter: 'grayscale(1)' /* W3C */
              }}
            />
          : <text
              x="50"
              y="60"
              textAnchor="middle"
              style={{ fontSize: '2.5em' }}
            >
              {skill.data.altIconText}
            </text>}
      </svg>
    </span>
  )
}

// const styles = StyleSheet.create({
//   red: {
//     padding: '3px'
//     // outline: '1px solid black'
//   }
// })
