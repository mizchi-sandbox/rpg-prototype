/* @flow */
import { takeEvery, put } from 'redux-saga/lib/effects'
import type { BattleState } from 'core/lib/battle'
import { processTurn } from 'core/lib/battle'
import { START, START_REQUEST, TICK, TICK_REQUEST } from '../reducers/battle'

const initialState: BattleState = {
  allies: [
    {
      name: 'mizchi',
      life: 50,
      ap: { val: 0, max: 15 },
      skills: [
        {
          skillId: 0,
          displayName: 'Attack',
          actionCost: 5,
          type: 'exec'
        },
        {
          skillId: 1,
          displayName: 'PowerAttack',
          actionCost: 9,
          type: 'exec'
        }
      ]

    }
  ],
  enemies: [
    {
      name: 'goblin',
      life: 15,
      ap: { val: 0, max: 10 },
      skills: [
        {
          skillId: 0,
          displayName: 'Attack',
          actionCost: 8,
          type: 'auto'
        }
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
