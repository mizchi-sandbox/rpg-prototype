/* @flow */
import { connect } from 'react-redux'
import AdventureScene from '../components/organisms/AdventureScene'
import type { State as RootState } from '../reducers'
import type { AppAction } from '../actions/appActions'
import type { AdventureAction } from '../actions/adventureActions'
import type { State as AdventureState } from '../reducers/adventure'

export type AdventureContainerProps = AdventureState &
  Redux$Dispatcher<AppAction | AdventureAction>

const mapStateToProps: RootState => AdventureState = root => root.adventure

const connector: Redux$Connector<{}, RootState, any> = connect(mapStateToProps)
export default connector(AdventureScene)
