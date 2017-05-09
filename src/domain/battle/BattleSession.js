/* @flow */
import * as BattlerActions from './Battler'
import type { Battler } from './Battler'
import type { Command, CommandApplicationProgress } from './Command'
import type { CommandResult } from './CommandResult'
import type { Input } from './Input'
import { battleStateMock0 } from './__mock/battleStateMock'

// State
export type BattleSession = {
  battlers: Battler[],
  turn: number
}

export function processPreUpdatePhase(state: BattleSession): BattleSession {
  return {
    ...state,
    battlers: state.battlers.map(BattlerActions.updateBattlerState)
  }
}

export function processPlanningPhase(
  state: BattleSession,
  inputQueue: Input[]
): Command[] {
  return Object.freeze(
    state.battlers.reduce((commands, battler) => {
      const inputs = inputQueue.filter(input => input.battlerId === battler.id)
      return commands.concat(
        BattlerActions.planNextCommand(battler, inputs, state)
      )
    }, [])
  )
}

export function processCommandExecPhase(
  state: BattleSession,
  commandQueue: Command[]
): CommandApplicationProgress {
  return Object.freeze(
    commandQueue.reduce(
      (next: CommandApplicationProgress, nextCmd: Command) => {
        const { state: nextState, commandResults } = nextCmd(next.state)
        return {
          state: nextState,
          commandResults: next.commandResults.concat(commandResults)
        }
      },
      { state, commandResults: [] }
    )
  )
}

export function isBattleFinished(
  state: BattleSession
): ?{ winner: 'ally' | 'enemy' } {
  if (
    state.battlers.filter(b => b.side === 'enemy').every(b => b.life.val <= 0)
  ) {
    return { winner: 'ally' }
  }

  if (
    state.battlers.filter(b => b.side === 'ally').every(b => b.life.val <= 0)
  ) {
    return { winner: 'enemy' }
  }

  return null
}

export function processTurn(
  state: BattleSession,
  inputQueue: Input[]
): { state: BattleSession, commandResults: CommandResult[] } {
  // update pre-actions
  const preUpdatedState = processPreUpdatePhase(state, inputQueue)

  // create commands
  const commandQueue = processPlanningPhase(preUpdatedState, inputQueue)

  // exec commands
  return processCommandExecPhase(preUpdatedState, commandQueue)
}

export function createBattleSession(): BattleSession {
  // TODO: Return real state
  return battleStateMock0
}
