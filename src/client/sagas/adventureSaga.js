/* @flow */
import * as AppActions from '../actions/appActions'
import * as PlayingActions from '../actions/playingActions'
import * as AdventureActions from '../actions/adventureActions'
import * as Session from 'domain/adventure/AdventureSession'
import type { Resource } from 'domain/entities/Resource'
import { take, takeEvery, put } from 'redux-saga/effects'

export function* startAdventure(): any {
  let session = Session.load()
  yield put(AdventureActions.sync(session))
  while (true) {
    const action = yield take(action =>
      [
        AdventureActions.REQUEST_ADD_RESOURCES,
        AdventureActions.REQUEST_EXIT
      ].includes(action.type)
    )
    switch (action.type) {
      case AdventureActions.REQUEST_ADD_RESOURCES:
        const resources: Resource[] = action.payload.resources
        session = Session.addResources(session, resources)
        for (const res of resources) {
          yield put(
            AdventureActions.addLog(
              `Add resource ${res.resourceName}:${res.amount}`
            )
          )
        }
        yield put(AdventureActions.sync(session))
        break
      case AdventureActions.REQUEST_EXIT:
        yield put(PlayingActions.finishAdventureSession({ session }))
        yield put(AppActions.popScene())
        return
    }
  }
}

export default function* playingSessionSaga(): any {
  yield takeEvery(AdventureActions.REQUEST_START_ADVENTURE, startAdventure)
}
