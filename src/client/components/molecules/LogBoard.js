/* @flow */
import React from 'react'
import { StyleSheet, css } from 'aphrodite'

export default function LogBoard(props: {
  messages: string[],
  direction: 'upper' | 'bottom'
}) {
  return (
    <div className={css(styles.logBoard)}>
      {props.messages.map((message, index) => (
        <p className={css(styles.message)} key={index}>
          {message}
        </p>
      ))}
    </div>
  )
}

const styles = StyleSheet.create({
  logBoard: {},
  message: {}
})
