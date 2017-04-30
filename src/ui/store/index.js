/* @flow */
import { applyMiddleware, createStore } from 'redux'
import promiseMiddleware from 'redux-promise'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducers'
import mySaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(promiseMiddleware, logger, sagaMiddleware))
// see https://github.com/reactjs/react-router-redux/issues/348#issuecomment-286657767
// export const history = syncHistoryWithStore(createBrowserHistory(), store)
sagaMiddleware.run(mySaga)

export default store
