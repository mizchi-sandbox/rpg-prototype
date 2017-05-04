/* @flow */
import type { BattleState } from './BattleState'
import type { Result } from './Result'

export type Command = BattleState => CommandOnProgressState

export type CommandOnProgressState = {
  state: BattleState,
  results: Result[]
}
