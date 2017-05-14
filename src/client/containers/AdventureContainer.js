/* @flow */
import { connect } from 'react-redux'
import AdventureScene from '../components/organisms/AdventureScene'
// eslint-disable-next-line
import type { Dispatcher, Connector } from '@mizchi/redux-helper'
import type { State as RootState } from '../reducers'
import type { AppAction } from '../actions/appActions'
import type { AdventureAction } from '../actions/adventureActions'
import type { State as AdventureState } from '../reducers/adventure'

export type AdventureContainerProps = RootState &
  Dispatcher<AppAction | AdventureAction>

const mapStateToProps: RootState => { adventure: AdventureState } = root => ({
  adventure: root.adventure
})

const connector: Connector<{}, RootState, any> = connect(mapStateToProps)
export default connector(AdventureScene)
