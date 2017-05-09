/* @flow */
import * as BattlerFactory from '../BattlerFactory'
import type { BattleState } from '../BattleState'

export const battleStateMock0: BattleState = Object.freeze({
  turn: 0,
  inputQueue: [],
  battlers: BattlerFactory.buildAllyBattlers([
    {
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
      controllable: true,
      displayName: 'Player1',
      lifeValue: 50,
      acquiredSkills: [
        { skillId: '$attack', lv: 1 },
        { skillId: '$heal-self', lv: 1 }
      ]
    }
  ]).concat(
    BattlerFactory.buildEnemyBattlers([
      {
        monsterId: '$goblin',
        lifeValue: 30,
        acquiredSkills: [
          {
            skillId: '$attack',
            lv: 1
          }
        ]
      },
      {
        monsterId: '$hob-goblin',
        lifeValue: 50,
        acquiredSkills: [
          {
            skillId: '$attack',
            lv: 1
          },
          {
            skillId: '$power-attack',
            lv: 1
          }
        ]
      }
    ])
  )
})
