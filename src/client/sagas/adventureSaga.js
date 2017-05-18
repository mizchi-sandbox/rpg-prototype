/* @flow */
import * as AdventureActions from '../actions/adventureActions'
// import * as PlayingActions from '../actions/playingActions'
import * as AdventureSession from 'domain/entities/AdventureSession'
import type { Resource } from 'domain/entities/Resource'
import { take, takeEvery, put, race } from 'redux-saga/effects'

export function* load(): any {
  let session = AdventureSession.load()
  yield put(AdventureActions.loadedAdventureSession(session))
  while (true) {
    // Update session
    const action = yield take(AdventureActions.REQUEST_ADD_RESOURCES)
    const { addResources, exit } = yield race({
      addResources: take(AdventureActions.REQUEST_ADD_RESOURCES),
      exit: take(AdventureActions.EXIT)
    })
    if (addResources) {
      const resources: Resource[] = action.payload.resources
      session = AdventureSession.addResources(session, resources)
      for (const res of resources) {
        yield put(
          AdventureActions.addLog(
            `Add resource ${res.resourceName}:${res.amount}`
          )
        )
      }
      yield put(AdventureActions.loadedAdventureSession(session))
    }

    if (exit) {
      // TODO: Refactor mergeResources
      // Add resources to playing session and exit

      yield put(AdventureActions.loadedAdventureSession(session))
    }
  }
}

export default function* playingSessionSaga(): any {
  yield takeEvery(AdventureActions.REQUEST_LOAD_PLAYING_SESSION, load)
  // yield takeEvery(PlayingActions.PLAYING_SESSION_LOADED, load)
}
