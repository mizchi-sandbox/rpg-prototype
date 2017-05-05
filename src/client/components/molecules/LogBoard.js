/* @flow */
import React from 'react'
import { StyleSheet, css } from 'aphrodite'

// export default
function Message(props: { message: string }) {
  return (
    <p className={css(styles.message)}>
      {props.message}
    </p>
  )
}

export default function LogBoard(props: {
  messages: string[],
  direction: 'upper' | 'bottom'
}) {
  return (
    <div className={css(styles.logBoard)}>
      {props.messages.map((message, index) => ( // Animate a list of items as they are added
        <Message message={message} key={index} />
      ))}
    </div>
  )
}

const styles = StyleSheet.create({
  logBoard: {},
  message: {}
})
