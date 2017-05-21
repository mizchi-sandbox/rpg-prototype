/* @flow */
import { connect } from 'react-redux'
import GlobalHeader from '../components/molecules/GlobalHeader'
import type { State as RootState } from '../reducers'
import type { AppAction } from '../actions/appActions'
import type { AdventureAction } from '../actions/adventureActions'

export type GlobalHeaderContainerProps = RootState &
  Redux$Dispatcher<AppAction | AdventureAction>

const mapStateToProps: RootState => RootState = root => root

const connector: Redux$Connector<{}, RootState, any> = connect(mapStateToProps)
export default connector(GlobalHeader)
