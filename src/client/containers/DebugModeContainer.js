/* @flow */
import { connect } from 'react-redux'
import DebugMode from '../components/organisms/DebugMode'
import type { State as RootState } from '../reducers'
import type { AppAction } from '../actions/appActions'
import type { AdventureAction } from '../actions/adventureActions'

export type DebugModeContainerProps = RootState &
  Redux$Dispatcher<AppAction | AdventureAction>

const mapStateToProps: RootState => RootState = root => root

const connector: Redux$Connector<{}, RootState, any> = connect(mapStateToProps)
export default connector(DebugMode)
