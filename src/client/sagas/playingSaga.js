/* @flow */
import * as PlayingActions from '../actions/playingActions'
import * as PlayingSession from 'domain/entities/PlayingSession'
import { takeEvery, put } from 'redux-saga/effects'

// export function* load(action: { payload: { savedataId: string } }): any {
export function* load(action: { payload: { savedataId: string } }): any {
  const session = PlayingSession.loadBySavedataId(action.payload.savedataId)
  yield put(PlayingActions.loaded(session))
}

export default function* playingSaga(): any {
  yield takeEvery(PlayingActions.REQUEST_TO_START_PLYAING_SESSION, load)
}
