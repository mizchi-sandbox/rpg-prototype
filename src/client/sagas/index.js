/* @flow */
import battleSaga from './battleSaga'
import adventureSaga from './adventureSaga'
import playingSaga from './playingSaga'
import { fork } from 'redux-saga/effects'

export default function* rootSaga(): any {
  yield fork(battleSaga)
  yield fork(adventureSaga)
  yield fork(playingSaga)
}
