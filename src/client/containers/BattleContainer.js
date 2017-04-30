/* @flow */
import React from 'react'
import { connect } from 'react-redux'
// eslint-disable-next-line
import type { Dispatcher, Connector } from '@mizchi/redux-helper'
import Battle from '../components/Battle'
import type {
  State,
  Action as BattleAction
} from '../reducers/battle'

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
