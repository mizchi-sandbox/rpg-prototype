/* @flow */
// TODO
import { fork } from 'redux-saga/lib/effects'
import battleSaga from './battle-saga'

export default function * rootSaga (): any {
  yield fork(battleSaga)
}
