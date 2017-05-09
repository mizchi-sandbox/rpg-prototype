/* @flow */
import { delay } from 'redux-saga'
import { sync } from '../actions/battleSagaActions'
import * as battleActions from '../actions/battleActions'
import type { BattleSession } from 'domain/battle'
import { createBattleSession, isBattleFinished, processTurn } from 'domain/battle'
import { call, put, race, take, takeEvery } from 'redux-saga/effects'
import * as CommandResultActions from 'domain/battle/CommandResult'
import type { Input, Battler, Skill } from 'domain/battle'

let _inputQueue: Input[] = []

function hydrateInputQueue() {
  const iq = _inputQueue
  _inputQueue = []
  return iq
}

function* addInputToQueue(action: any) {
  if (waitMode) {
    // Can't intercept
    return
  }
  _inputQueue = _inputQueue.concat([{ ...action.payload, id: Symbol('input') }])
  yield put(battleActions.updateInputQueue(_inputQueue))
}

export function findActiveSkill(battlers: Battler[]): ?Skill {
  for (const b of battlers) {
    if (b.controllable) {
      const executableSkill = b.skills.find(
        sk => sk.cooldown.val >= sk.cooldown.max
      )
      if (executableSkill) {
        return executableSkill
      }
    }
  }
  return
}

let waitMode = false
function* start(_action: any) {
  // Use wait mode
  waitMode = location.search.indexOf('wait') > -1

  let state: BattleSession = createBattleSession()

  // Sync first
  yield put(sync(state))

  // Start loop
  while (true) {
    // InputQueue buffer
    let takenInputQueue: Input[] = []

    // WaitMode: check executableSkill
    if (waitMode) {
      // Wait input on wait mode
      const executableSkill = findActiveSkill(state.battlers)
      if (executableSkill) {
        yield put(sync(state))
        yield put(battleActions.paused())
        const takenInputAction: { payload: Input } = yield take(
          battleActions.ADD_INPUT_TO_QUEUE
        )
        takenInputQueue = [takenInputAction.payload]
        yield put(battleActions.restarted())
        yield call(delay, 100)
      }
    }

    // ActiveMode: wait interval or intercept by pause request
    if (!waitMode) {
      // const { paused, waited } = yield race({
      const { paused } = yield race({
        waited: call(delay, 300),
        paused: take(battleActions.REQUEST_PAUSE)
      })
      // if user request pausing, wait for restart
      if (paused) {
        yield put(battleActions.paused())
        yield take(battleActions.REQUEST_RESTART)
        yield put(battleActions.restarted())
      }
      // Get input
      takenInputQueue = hydrateInputQueue()
      yield put(battleActions.updateInputQueue([]))
    }

    // Update state
    const processed = processTurn(state, takenInputQueue)
    state = processed.state
    for (const result of processed.commandResults) {
      switch (result.type) {
        case CommandResultActions.LOG:
          yield put(battleActions.log(result.message))
          if (waitMode) {
            yield put(sync(state))
            yield call(delay, 100)
          }
          break
      }
    }

    // Check finished flag
    const finshed = isBattleFinished(state)
    if (finshed) {
      yield put(sync(state))
      // yield put(battleActions.log(`${finshed.winner} win.`))
      yield put(battleActions.openCommandResult(`${finshed.winner} win.`))
      break
    }

    // Sync state by each frame on active
    if (!waitMode) {
      yield put(sync(state))
    }

    // Clear inputQueue
    takenInputQueue = []
  }
}

export default function* battleSaga(): any {
  yield takeEvery(battleActions.REQUEST_START, start)
  yield takeEvery(battleActions.ADD_INPUT_TO_QUEUE, addInputToQueue)
}
