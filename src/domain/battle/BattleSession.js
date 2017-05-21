/* @flow */
import * as BattlerActions from './Battler'
import * as BattlerFactory from './BattlerFactory'
import type { Battler } from './Battler'
import type { Command, CommandApplicationProgress } from './Command'
import type { CommandResult } from './CommandResult'
import type { Input } from './Input'
import type { BattleSessionResult } from './BattleSessionResult'
import { battleStateMock0 } from './__mock/battleStateMock'
import type { AdventureSession } from 'domain/sessions/AdventureSession'

// State
export type BattleSession = {
  battlers: Battler[],
  turn: number
}

export function buildBattleSession(ps: AdventureSession): BattleSession {
  const allies = BattlerFactory.buildAllyBattlers(ps.actors)
  const enemies = BattlerFactory.buildEnemyBattlers([
    {
      monsterId: '$goblin'
    },
    {
      monsterId: '$hob-goblin'
    }
  ])
  return {
    turn: 0,
    battlers: allies.concat(enemies)
  }
}

export function processPreUpdatePhase(session: BattleSession): BattleSession {
  return {
    ...session,
    battlers: session.battlers.map(BattlerActions.updateBattlerState)
  }
}

export function processPlanningPhase(
  session: BattleSession,
  inputQueue: Input[]
): Command[] {
  return Object.freeze(
    session.battlers.reduce((commands, battler) => {
      const inputs = inputQueue.filter(input => input.battlerId === battler.id)
      return commands.concat(
        BattlerActions.planNextCommand(battler, inputs, session)
      )
    }, [])
  )
}

export function processCommandExecPhase(
  session: BattleSession,
  commandQueue: Command[]
): CommandApplicationProgress {
  return Object.freeze(
    commandQueue.reduce(
      (next: CommandApplicationProgress, nextCmd: Command) => {
        const { session: nextState, commandResults } = nextCmd(next.session)
        return {
          session: nextState,
          commandResults: next.commandResults.concat(commandResults)
        }
      },
      { session, commandResults: [] }
    )
  )
}

export function isBattleFinished(session: BattleSession): ?BattleSessionResult {
  if (
    session.battlers.filter(b => b.side === 'enemy').every(b => b.life.val <= 0)
  ) {
    return {
      winner: 'ally',
      rewards: {
        resources: [
          {
            resourceId: '$gold',
            resourceName: 'gold',
            amount: 30
          }
        ]
      }
    }
  }

  if (
    session.battlers.filter(b => b.side === 'ally').every(b => b.life.val <= 0)
  ) {
    return { winner: 'enemy' }
  }

  return null
}

export function processTurn(
  session: BattleSession,
  inputQueue: Input[]
): { session: BattleSession, commandResults: CommandResult[] } {
  // update pre-actions
  const preUpdatedState = processPreUpdatePhase(session, inputQueue)

  // create commands
  const commandQueue = processPlanningPhase(preUpdatedState, inputQueue)

  // exec commands
  return processCommandExecPhase(preUpdatedState, commandQueue)
}

export function createBattleSession(): BattleSession {
  // TODO: Return real session
  return battleStateMock0
}
