/* @flow */
import type { Resource } from 'domain/entities/Resource'

export type BattleSessionReward = {
  resources: Resource[]
}

export type BattleSessionResult =
  | {
      winner: 'ally',
      rewards: BattleSessionReward
    }
  | {
      winner: 'enemy'
    }
  | {
      winner: 'escaped'
    }
