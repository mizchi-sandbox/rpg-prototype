/* @flow */
import React from 'react'

export default function Layout(props: any) {
  return (
    <div style={{ userSelect: 'none' }}>
      {props.children}
    </div>
  )
}
