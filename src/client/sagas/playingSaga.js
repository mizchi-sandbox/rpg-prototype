/* @flow */
import * as PlayingActions from '../actions/playingActions'
import * as PlayingSession from 'domain/sessions/PlayingSession'
import { takeEvery, put } from 'redux-saga/effects'
import type { AdventureResult } from 'domain/adventure/AdventureResult'

let currentSession = null

export function* load(action: {
  type: typeof PlayingActions.REQUEST_FINISH_ADVENTURE,
  payload: { savedataId: string }
}): any {
  currentSession = PlayingSession.loadBySavedataId(action.payload.savedataId)
  yield put(PlayingActions.loaded(currentSession))
}

export function* finishAdventureSession(action: {
  payload: AdventureResult
}): any {
  if (currentSession) {
    currentSession = PlayingSession.collectResources(
      currentSession,
      action.payload.session.resources
    )
    yield put(PlayingActions.loaded(currentSession))
  } else {
    console.warn('no playing session')
  }
}

export default function* playingSaga(): any {
  yield takeEvery(PlayingActions.REQUEST_TO_START_PLYAING_SESSION, load)
  yield takeEvery(
    PlayingActions.REQUEST_FINISH_ADVENTURE,
    finishAdventureSession
  )
}
