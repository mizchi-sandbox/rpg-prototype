/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import Battle from '../components/pages/Battle'
import type { State } from '../reducers/battle'
import type { BattleAction } from '../actions/battleActions'
// eslint-disable-next-line
import type { Dispatcher, Connector } from '@mizchi/redux-helper'

export type BattleContainerProps = State & Dispatcher<BattleAction>

function BattleContainer (
  props: BattleContainerProps
) {
  return (
    <Battle {...props} dispatch={props.dispatch}/>
  )
}

const connector: Connector<{}, BattleContainerProps, BattleAction> =
  connect(({ battle }) => {
    return battle
  })
export default connector(BattleContainer)
