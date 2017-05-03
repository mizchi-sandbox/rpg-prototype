/* @flow */
import battleSaga from './battleSaga'
import { fork } from 'redux-saga/effects'

export default function * rootSaga (): any {
  yield fork(battleSaga)
}
