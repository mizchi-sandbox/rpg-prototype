/* @flow */
import { takeEvery, put, call } from 'redux-saga/lib/effects'
import loadMaster from '../../domain/loadMaster'
import { processTurn } from '../../domain/battle'
import type { BattleState } from '../../domain/battle'
import { START_REQUEST, ADD_INPUT_TO_QUEUE } from '../reducers/battle'

// Action
export const SYNC = 'battel-saga/sync'
export type SyncAction = {
  type: typeof SYNC,
  payload: BattleState
}

export const sync = (state: BattleState): SyncAction => ({
  type: SYNC,
  payload: state
})

const initialState: BattleState = {
  inputQueue: [],
  battlers: [
    {
      side: 'ally',
      formationOrder: 0,
      id: 'ally-0',
      name: 'mizchi',
      life: { val: 50, max: 50 },
      ap: { val: 0, max: 15 },
      skills: [
        loadMaster('skill', '$attack'),
        loadMaster('skill', '$power-attack')
      ]
    },
    {
      side: 'enemy',
      formationOrder: 0,
      id: 'enemy-0',
      name: 'goblin',
      life: { val: 30, max: 30 },
      ap: { val: 0, max: 10 },
      skills: [
        loadMaster('skill', '$attack')
      ]
    }
  ],
  turn: 0
}

const wait = () => new Promise(resolve => setTimeout(resolve, 2000))

let _state: ?BattleState = null
function * startRequest (_action: any) {
  _state = initialState
  yield put(sync(_state))
  while (true) {
    yield call(wait)
    _state = processTurn(_state)
    yield put(sync(_state))
  }
}

function * addInputToQueue (action: any) {
  if (_state) {
    _state = {
      ..._state,
      inputQueue: _state.inputQueue.concat([action.payload])
    }
  }
}

export default function * battleSaga (): any {
  yield takeEvery(START_REQUEST, startRequest)
  yield takeEvery(ADD_INPUT_TO_QUEUE, addInputToQueue)
  // yield takeEvery(TICK_REQUEST, tickRequest)
}
