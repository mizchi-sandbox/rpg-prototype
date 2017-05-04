/* @flow */
import type { BattleState } from './BattleState'
import type { Result } from './Result'

export type Command = BattleState => CommandApplicationProgress

export type CommandApplicationProgress = {
  state: BattleState,
  results: Result[]
}
