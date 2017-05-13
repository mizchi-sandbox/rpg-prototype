/* @flow */
import battleSaga from './battleSaga'
import adventureSessionSaga from './adventureSessionSaga'
import { fork } from 'redux-saga/effects'

export default function* rootSaga(): any {
  yield fork(battleSaga)
  yield fork(adventureSessionSaga)
}
