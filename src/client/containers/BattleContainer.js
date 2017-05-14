/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import BattleScene from '../components/organisms/BattleScene'
import type { State as BattleState } from '../reducers/battle'
import type { State as RootReducerState } from '../reducers'
import type { BattleAction } from '../actions/battleActions'
import type { AppAction } from '../actions/appActions'

export type BattleContainerAction = BattleAction | AppAction
export type BattleContainerProps = BattleState &
  Redux$Dispatcher<BattleContainerAction>

function BattleContainer(props: BattleContainerProps) {
  return <BattleScene {...props} dispatch={props.dispatch} />
}

const mapStateToProps: RootReducerState => BattleState = root => root.battle

const connector: Redux$Connector<
  {},
  BattleContainerProps,
  BattleContainerAction
> = connect(mapStateToProps)
export default connector(BattleContainer)
