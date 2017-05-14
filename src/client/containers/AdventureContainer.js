/* @flow */
import { connect } from 'react-redux'
import AdventureScene from '../components/organisms/AdventureScene'
// eslint-disable-next-line
import type { Dispatcher, Connector } from '@mizchi/redux-helper'
import type { State as RootState } from '../reducers'
import type { AppAction } from '../actions/appActions'
import type { AdventureAction } from '../actions/adventureActions'

export type DebugModeContainerProps = RootState &
  Dispatcher<AppAction | AdventureAction>

const mapStateToProps: RootState => RootState = root => root

const connector: Connector<{}, RootState, any> = connect(mapStateToProps)
export default connector(AdventureScene)
