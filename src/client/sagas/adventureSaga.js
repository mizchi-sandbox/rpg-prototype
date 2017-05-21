/* @flow */
import * as AdventureActions from '../actions/adventureActions'
import * as Session from 'domain/adventure/AdventureSession'
import type { Resource } from 'domain/entities/Resource'
import { take, takeEvery, put, race } from 'redux-saga/effects'

export function* startAdventure(): any {
  let session = Session.load()
  yield put(AdventureActions.loadedAdventureSession(session))
  while (true) {
    const { addResources, exit } = yield race({
      addResources: take(AdventureActions.REQUEST_ADD_RESOURCES),
      exit: take(AdventureActions.EXIT)
    })
    if (addResources) {
      const resources: Resource[] = addResources.payload.resources
      session = Session.addResources(session, resources)
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
      // yield put(AdventureActions.loadedAdventureSession(session))
      yield put(AdventureActions.loadedAdventureSession(session))
    }
  }
}

export default function* playingSessionSaga(): any {
  yield takeEvery(AdventureActions.REQUEST_START_ADVENTURE, startAdventure)
}
