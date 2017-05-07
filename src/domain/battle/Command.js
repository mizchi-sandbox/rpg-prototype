/* @flow */
import type { BattleState } from './BattleState'
import type { CommandResult } from './CommandResult'

export type Command = BattleState => CommandApplicationProgress

export type CommandApplicationProgress = {
  state: BattleState,
  results: CommandResult[]
}
