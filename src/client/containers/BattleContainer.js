/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import BattleScene from '../components/organisms/BattleScene'
import type { State as BattleReducerState } from '../reducers/battle'
import type { State as RootReducerState } from '../reducers'
import type { BattleAction } from '../actions/battleActions'
// eslint-disable-next-line
import type { Dispatcher, Connector } from '@mizchi/redux-helper'

export type BattleContainerProps = BattleReducerState & Dispatcher<BattleAction>

function BattleContainer(props: BattleContainerProps) {
  return <BattleScene {...props} dispatch={props.dispatch} />
}

const mapStateToProps: RootReducerState => BattleReducerState = root =>
  root.battle

const connector: Connector<{}, BattleContainerProps, BattleAction> = connect(
  mapStateToProps
)
export default connector(BattleContainer)
