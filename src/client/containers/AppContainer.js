/* @flow */
import { connect } from 'react-redux'
import App from '../components/App'
// eslint-disable-next-line
import type { Dispatcher, Connector } from '@mizchi/redux-helper'
import type { State as RootState } from '../reducers'
import type { State as AppState, Action as AppAction } from '../reducers/app'

export type AppContainerProps = AppState & Dispatcher<AppAction>

const mapStateToProps: RootState => AppState = root => root.app

const connector: Connector<{}, AppState, AppAction> = connect(mapStateToProps)
export default connector(App)
