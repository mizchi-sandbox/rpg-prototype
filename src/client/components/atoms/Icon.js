/* @flow */
import React from 'react'
import { StyleSheet, css } from 'aphrodite'

export default function Icon (
  props: {
    name: string,
    onClick: Function
  },
) {
  return <span
    className={css(styles.red)}
    onClick={ev => {
      props.onClick(ev)
    }}
  >
    { props.name }
  </span>
}

const styles = StyleSheet.create({
  red: {
    backgroundColor: 'red'
  }
})
