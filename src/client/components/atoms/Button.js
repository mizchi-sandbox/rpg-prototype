/* @flow */
import React from 'react'
// import { StyleSheet, css } from 'aphrodite'
import { Button as SemanticButton } from 'semantic-ui-react'

export default function Button(props: { label: string, onClick: Function }) {
  return (
    <SemanticButton
      onClick={ev => {
        props.onClick(ev)
      }}
    >
      {props.label}
    </SemanticButton>
  )
}
