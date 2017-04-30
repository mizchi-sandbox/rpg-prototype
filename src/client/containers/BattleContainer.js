/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import type { Dispatcher, Connector } from '@mizchi/redux-helper'
import Battle from '../components/Battle'
import type {
  State as BattleState,
  Action as BattleAction
} from '../reducers/battle'

export type BattleContainerProps = BattleState & Dispatcher<BattleAction>

function BattleContainer (
  props: BattleContainerProps
) {
  return (
    <Battle {...props} dispatch={props.dispatch} />
  )
}

const connector: Connector<{}, BattleContainerProps, BattleAction> = connect(({ battle }) => battle)
export default connector(BattleContainer)
