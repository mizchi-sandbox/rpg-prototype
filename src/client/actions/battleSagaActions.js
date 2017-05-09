/* @flow */
import type { BattleSession } from '../../domain/battle'

// Constants
export const SYNC = 'battel-saga/sync'

// Action
export type SyncAction = {
  type: typeof SYNC,
  payload: BattleSession
}

export type BattleSagaAction = SyncAction

// Action creator
export const sync = (state: BattleSession): SyncAction => ({
  type: SYNC,
  payload: state
})
