/* @flow */
import { connect } from 'react-redux'
import DebugMode from '../components/organisms/DebugMode'
// eslint-disable-next-line
import type { Dispatcher, Connector } from '@mizchi/redux-helper'
import type { State as RootState } from '../reducers'
import type { Action as AppAction } from '../actions/AppActions'

export type DebugModeContainerProps = RootState & Dispatcher<AppAction>

const mapStateToProps: RootState => RootState = root => root

const connector: Connector<{}, RootState, any> = connect(mapStateToProps)
export default connector(DebugMode)
