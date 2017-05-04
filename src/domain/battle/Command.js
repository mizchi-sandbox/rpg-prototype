/* @flow */
import type { BattleState } from './BattleState'
import type { Result } from './Result'

export type Command = {
  battlerId: string,
  skillId: string
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
