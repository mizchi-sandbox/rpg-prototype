/* @flow */
import { takeEvery, put } from 'redux-saga/lib/effects'
import loadMaster from '../../domain/loadMaster'
import { processTurn } from '../../domain/battle'
import type { BattleState } from '../../domain/battle'
import { START, START_REQUEST, TICK, TICK_REQUEST } from '../reducers/battle'

const initialState: BattleState = {
  actionQueue: [],
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

let _state: ?BattleState = null
function * startRequest (_action: any): Generator<*, void, *> {
  _state = initialState
  yield put({
    type: START,
    payload: _state
  })
}

function * tickRequest () {
  if (_state) {
    _state = processTurn(_state)
    yield put({
      type: TICK,
      payload: _state
    })
  }
}

export default function * battleSaga (): any {
  yield takeEvery(START_REQUEST, startRequest)
  yield takeEvery(TICK_REQUEST, tickRequest)
}
