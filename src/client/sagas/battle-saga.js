/* @flow */
import { takeEvery, put } from 'redux-saga/lib/effects'
import { PROCESS_TURN_START, PROCESS_TURN_END } from '../reducers/battle'

function * processTurn (_action: any) {
  yield put({ type: PROCESS_TURN_END })
}

export default function * battleSaga (): any {
  yield takeEvery(PROCESS_TURN_START, processTurn)
}
