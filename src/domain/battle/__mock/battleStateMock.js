/* @flow */
import * as BattlerFactory from '../BattlerFactory'
import type { BattleState } from '../BattleState'

export const battleStateMock0: BattleState = Object.freeze({
  turn: 0,
  battlers: BattlerFactory.buildAllyBattlers([
    {
      id: '$player1',
      controllable: true,
      displayName: 'Player1',
      lifeValue: 150,
      acquiredSkills: [
        { skillId: '$attack', lv: 1 },
        { skillId: '$power-attack', lv: 1 },
        { skillId: '$fire-wave', lv: 1 },
        { skillId: '$heal-self', lv: 1 }
      ]
    },
    {
      id: '$bot1',
      controllable: false,
      displayName: 'BOT1',
      lifeValue: 50,
      acquiredSkills: [
        { skillId: '$attack', lv: 1 },
        { skillId: '$heal-self', lv: 1 }
      ]
    }
  ]).concat(
    BattlerFactory.buildEnemyBattlers([
      {
        monsterId: '$goblin'
      },
      {
        monsterId: '$hob-goblin'
      }
    ])
  )
})
