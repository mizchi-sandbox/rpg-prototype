/* @flow */
import React from 'react'
import { StyleSheet, css } from 'aphrodite'

export default function Button(props: { label: string, onClick: Function }) {
  return (
    <button
      className={css(styles.button)}
      onClick={ev => {
        props.onClick(ev)
      }}
    >
      {props.label}
    </button>
  )
}

const styles = StyleSheet.create({
  button: {}
})
