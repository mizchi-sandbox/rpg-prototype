/* @flow */
import React from 'react'

export default function Layout(props: any) {
  return (
    <div
      style={{
        backgroundColor: '#ddd',
        userSelect: 'none',
        margin: '0 auto',
        padding: 10,
        width: '800px',
        height: '600px'
      }}
    >
      {props.children}
    </div>
  )
}
