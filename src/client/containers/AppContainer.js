/* @flow */
import { connect } from 'react-redux'
import App from '../components/App'
import type { State as RootState } from '../reducers'
import type { State as AppState } from '../reducers/app'
import type { AppAction } from '../actions/appActions'

export type AppContainerProps = AppState & Redux$Dispatcher<AppAction>

const mapStateToProps: RootState => AppState = root => root.app

const connector: Redux$Connector<{}, AppState, AppAction> = connect(
  mapStateToProps
)
export default connector(App)
