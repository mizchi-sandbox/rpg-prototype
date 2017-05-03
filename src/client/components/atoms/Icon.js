/* @flow */
import React from 'react'

export default function SkillIcon (
  props: {
    name: string,
    onClick: Function
  },
) {
  return <span onClick={ev => {
    props.onClick(ev)
  }}>
    { props.name }
  </span>
}
