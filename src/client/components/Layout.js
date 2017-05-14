/* @flow */
import React from 'react'
import GlobalHeader from '../containers/GlobalHeader'

export default function Layout(props: any) {
  return (
    <div
      style={{
        backgroundColor: '#ddd',
        userSelect: 'none',
        margin: '0 auto',
        padding: 0,
        display: 'flex',
        flexFlow: 'column',
        width: '800px',
        height: '600px'
      }}
    >
      <div style={{ height: '30px' }}>
        <GlobalHeader />
      </div>

      <div style={{ flex: 1, padding: 10 }}>
        {props.children}
      </div>
    </div>
  )
}
