/* @flow */
import battleSaga from './battleSaga'
import playingSessionSaga from './playingSessionSaga'
import { fork } from 'redux-saga/effects'

export default function* rootSaga(): any {
  yield fork(battleSaga)
  yield fork(playingSessionSaga)
}
