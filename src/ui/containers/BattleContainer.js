/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import Battle from '../components/Battle'
import type { Dispatcher, Connector } from '../types'
import type { State, Action } from '../reducers/battle'

function BattleContainer (
  props: State & Dispatcher<Action>
) {
  return (
    <Battle {...props} />
  )
}

const connector: Connector<{}, State, Action> = connect(({ battle }) => battle)

export default connector(BattleContainer)
