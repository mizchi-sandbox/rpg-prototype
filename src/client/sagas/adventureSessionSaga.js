/* @flow */
import * as AdventureSessionActions from '../actions/adventureSessionActions'
import * as AdventureSession from 'domain/entities/AdventureSession'
import { takeEvery, put } from 'redux-saga/effects'

export function* load(): any {
  const session = AdventureSession.load()
  yield put(AdventureSessionActions.loadedAdventureSession(session))
}

export default function* playingSessionSaga(): any {
  yield takeEvery(AdventureSessionActions.REQUEST_LOAD_PLAYING_SESSION, load)
}
