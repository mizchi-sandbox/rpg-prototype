/* @flow */
import { call, put, fork } from 'redux-saga/effects'
import { delay, takeEvery } from 'redux-saga'

export function * execInactivateCheckedTasksAsync (): any {
  yield call(delay, 300)
  yield put({type: 'INACTIVATE_CHECKED_TASKS'})
}

export function * taskListSaga (): any {
  yield takeEvery('INACTIVATE_CHECKED_TASKS_ASYNC', execInactivateCheckedTasksAsync)
}

export default function * rootSaga (): any {
  yield fork(taskListSaga)
}
