/* @flow */
import React from 'react'
import { lifecycle } from 'recompose'
import type { SetupContainerProps } from '../../containers/SetupContainer'

export default lifecycle({
  componentDidMount() {
    // console.log('didmount')
  }
})(function SetupScene(_props: SetupContainerProps) {
  return (
    <div>
      <h1>Setup</h1>
    </div>
  )
})
