/* @flow */
import { loadMonsterData } from '../../master'
import { buildBattlerSkill } from '../BattlerSkill'
import type { BattleState } from '../BattleState'

export const battleStateMock0: BattleState = Object.freeze({
  inputQueue: [],
  battlers: [
    {
      id: Symbol('ally'),
      side: 'ally',
      formationOrder: 0,
      controllable: true,
      name: 'Player1',
      life: { val: 150, max: 150 },
      skills: [
        buildBattlerSkill('$attack', 1),
        buildBattlerSkill('$power-attack', 1)
      ]
    },
    {
      id: Symbol('ally'),
      side: 'ally',
      formationOrder: 1,
      controllable: false,
      name: 'BOT1',
      life: { val: 30, max: 30 },
      skills: [buildBattlerSkill('$attack', 1)]
    },
    {
      id: Symbol('enemy'),
      side: 'enemy',
      monsterData: loadMonsterData('$goblin'),
      formationOrder: 0,
      controllable: false,
      name: 'goblin',
      life: { val: 30, max: 30 },
      skills: [buildBattlerSkill('$attack', 1)]
    },
    {
      id: Symbol('enemy'),
      side: 'enemy',
      monsterData: loadMonsterData('$hob-goblin'),
      formationOrder: 0,
      controllable: false,
      name: 'goblin',
      life: { val: 45, max: 45 },
      skills: [buildBattlerSkill('$attack', 1)]
    }
  ],
  turn: 0
})
