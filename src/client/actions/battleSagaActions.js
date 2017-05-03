/* @flow */
import type { BattleState } from '../../domain/battle'

// Constants
export const SYNC = 'battel-saga/sync'

// Action
export type SyncAction = {
  type: typeof SYNC,
  payload: BattleState
}

export type BattleSagaAction =
| SyncAction

// Action creator
export const sync = (state: BattleState): SyncAction => ({
  type: SYNC,
  payload: state
})
