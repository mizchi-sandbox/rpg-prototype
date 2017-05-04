/* @flow */
import type { BattleState } from './BattleState'
import type { Result } from './Result'

export type Command = {
  id: Symbol,
  skillId: Symbol,
  actorId: Symbol,
  targetId: ?Symbol
}

export type CommandOnProgressState = {
  state: BattleState,
  results: Result[]
}

export function execCommand(
  state: BattleState,
  _cmd: Command
): CommandOnProgressState {
  return {
    state,
    results: []
  }
}
