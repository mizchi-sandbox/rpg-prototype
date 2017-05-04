/* @flow */
import { delay } from 'redux-saga'
import { processTurn, createBattleMock } from '../../domain/battle'
import { sync } from '../actions/battleSagaActions'
import type { BattleState } from '../../domain/battle'
import {
  REQUEST_START,
  REQUEST_PAUSE,
  REQUEST_RESTART,
  ADD_INPUT_TO_QUEUE,
  paused,
  restarted
} from '../actions/battleActions'
import { take, takeEvery, put, call, race } from 'redux-saga/effects'

let _state: ?BattleState = null
function* start(_action: any) {
  if (_state) {
    return // stop on duplicated
  }
  _state = createBattleMock()
  yield put(sync(_state))
  while (true) {
    // Wait or Pause
    const { _paused, _waited } = yield race({
      _waited: call(delay, 1000),
      _paused: take(REQUEST_PAUSE)
    })

    // if user request pausing, wait for restart
    if (_paused) {
      yield put(paused())
      yield take(REQUEST_RESTART)
      yield put(restarted())
    }

    if (_waited) {
      // Update state
      const processed = processTurn(_state)
      _state = processed.state

      console.log(processed.results)
      yield put(sync(_state))
    }
  }
}

function* addInputToQueue(action: any) {
  if (_state) {
    _state = {
      ..._state,
      inputQueue: _state.inputQueue.concat([action.payload])
    }
    yield put(sync(_state))
  }
}

export default function* battleSaga(): any {
  yield takeEvery(REQUEST_START, start)
  yield takeEvery(ADD_INPUT_TO_QUEUE, addInputToQueue)
}
