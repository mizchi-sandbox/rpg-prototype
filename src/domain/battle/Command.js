/* @flow */
import type { BattleSession } from './BattleSession'
import type { CommandResult } from './CommandResult'

export type Command = BattleSession => CommandApplicationProgress

export type CommandApplicationProgress = {
  state: BattleSession,
  commandResults: CommandResult[]
}
