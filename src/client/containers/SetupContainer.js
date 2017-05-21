/* @flow */
import { connect } from 'react-redux'
import SetupScene from '../components/organisms/SetupScene'
import type { AppAction } from '../actions/appActions'
import type { State as RootState } from '../reducers'
import type { State as SetupState } from '../reducers/setup'
import type { SetupAction } from '../actions/setupActions'

export type SetupContainerProps = SetupState &
  Redux$Dispatcher<AppAction | SetupAction>

const mapStateToProps: RootState => SetupState = root => root.setup

const connector: Redux$Connector<{}, SetupState, any> = connect(mapStateToProps)
export default connector(SetupScene)
