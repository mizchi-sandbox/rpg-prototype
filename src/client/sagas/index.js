/* @flow */
// TODO
import { fork } from 'redux-saga/lib/effects'
import battleSaga from './battleSaga'

export default function * rootSaga (): any {
  yield fork(battleSaga)
}
