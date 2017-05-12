/* @flow */
import { connect } from 'react-redux'
import DebugMode from '../components/organisms/DebugMode'
// eslint-disable-next-line
import type { Dispatcher, Connector } from '@mizchi/redux-helper'
import type { State as RootState } from '../reducers'
import type { AppAction } from '../actions/appActions'
import type { PlayingSessionAction } from '../actions/playingSessionActions'

export type DebugModeContainerProps = RootState &
  Dispatcher<AppAction | PlayingSessionAction>

const mapStateToProps: RootState => RootState = root => root

const connector: Connector<{}, RootState, any> = connect(mapStateToProps)
export default connector(DebugMode)
