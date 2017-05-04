/* @flow */
import { delay } from 'redux-saga'
import { sync } from '../actions/battleSagaActions'
import {
  REQUEST_START,
  REQUEST_PAUSE,
  REQUEST_RESTART,
  ADD_INPUT_TO_QUEUE,
  paused,
  restarted
} from '../actions/battleActions'
import type { BattleState } from 'domain/battle'
import { processTurn, createBattleMock } from 'domain/battle'
import { take, takeEvery, put, call, race } from 'redux-saga/effects'
import * as ResultActions from 'domain/battle/Result'
import type { Result } from 'domain/battle/Result'
import type { Input } from 'domain/battle/Input'

let _inputQueue: Input[] = []

function hydrateInputQueue() {
  const iq = _inputQueue
  _inputQueue = []
  return iq
}

function* addInputToQueue(action: any) {
  _inputQueue = _inputQueue.concat([{ ...action.payload, id: Symbol('input') }])
}

function* start(_action: any) {
  let state: BattleState = createBattleMock()
  yield put(sync(state))
  while (true) {
    // Wait or Pause
    const { _paused, _waited } = yield race({
      _waited: call(delay, 300),
      _paused: take(REQUEST_PAUSE)
    })

    // if user request pausing, wait for restart
    if (_paused) {
      yield put(paused())
      yield take(REQUEST_RESTART)
      yield put(restarted())
    }

    if (_waited) {
      const inputQueue = hydrateInputQueue()
      const processed = processTurn(state, inputQueue)
      state = processed.state
      for (const result of processed.results) {
        handleResult(result)
      }

      yield put(sync(state))
    }
  }
}

function handleResult(result: Result) {
  switch (result.type) {
    case ResultActions.LOG:
      // TODO: Send to LogBoard
      console.log(result.message)
      break
    default:
  }
}

export default function* battleSaga(): any {
  yield takeEvery(REQUEST_START, start)
  yield takeEvery(ADD_INPUT_TO_QUEUE, addInputToQueue)
}
