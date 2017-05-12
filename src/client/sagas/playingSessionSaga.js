/* @flow */
import * as PlayingSessionActions from '../actions/playingSessionActions'
import * as PlayingSession from 'domain/entities/PlayingSession'
import { takeEvery, put } from 'redux-saga/effects'

export function* load(): any {
  const session = PlayingSession.load()
  yield put(PlayingSessionActions.loadedPlayingSession(session))
}

export default function* playingSessionSaga(): any {
  yield takeEvery(PlayingSessionActions.REQUEST_LOAD_PLAYING_SESSION, load)
}
