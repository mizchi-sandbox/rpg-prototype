/* @flow */
import * as PlayingActions from '../actions/playingActions'
import * as PlayingSession from 'domain/entities/PlayingSession'
import { takeEvery, put } from 'redux-saga/effects'

export function* load(): any {
  const session = PlayingSession.load({})
  yield put(PlayingActions.loaded(session))
}

export default function* playingSaga(): any {
  yield takeEvery(PlayingActions.REQUEST_TO_START_PLYAING_SESSION, load)
}
