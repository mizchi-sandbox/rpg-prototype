/* @flow */
import * as AdventureActions from '../actions/adventureActions'
import * as PlayingActions from '../actions/playingActions'
import * as AdventureSession from 'domain/entities/AdventureSession'
import { takeEvery, put } from 'redux-saga/effects'

export function* load(): any {
  const session = AdventureSession.load()
  yield put(AdventureActions.loadedAdventureSession(session))
}

export default function* playingSessionSaga(): any {
  yield takeEvery(AdventureActions.REQUEST_LOAD_PLAYING_SESSION, load)
  yield takeEvery(PlayingActions.PLAYING_SESSION_LOADED, load)
}
