/* @flow */
import { applyMiddleware, createStore } from 'redux'
import promiseMiddleware from 'redux-promise'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducers'
import mySaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(promiseMiddleware, logger, sagaMiddleware))
sagaMiddleware.run(mySaga)

export default store
