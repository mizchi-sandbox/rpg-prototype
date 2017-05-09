/* @flow */
import { loadMonsterData } from '../../master'
import { buildBattlerSkill } from '../BattlerSkill'
import type { BattleState } from '../BattleState'
import type { Battler } from '../Battler'
import type { SkillId, MonsterId } from 'domain/master'

export type Actor = {
  displayName: string,
  controllable: boolean,
  lifeValue: number,
  acquiredSkills: AcquiredSkill[]
}

export type AcquiredSkill = {
  skillId: SkillId,
  lv: number
}

export function buildAllyBattler(data: {
  formationOrder: number,
  displayName: string,
  controllable: boolean,
  lifeValue: number,
  acquiredSkills: AcquiredSkill[]
}): Battler {
  return {
    id: Symbol('ally'),
    side: 'ally',
    formationOrder: data.formationOrder,
    controllable: data.controllable,
    displayName: data.displayName,
    life: { val: data.lifeValue, max: data.lifeValue },
    skills: data.acquiredSkills.map(as => buildBattlerSkill(as.skillId, as.lv))
  }
}

export function buildAllyBattlers(actors: Actor[]): Battler[] {
  return actors.map((actor, index) => {
    return buildAllyBattler({
      ...actor,
      formationOrder: index
    })
  })
}

export function buildEnemyBattler(data: {
  formationOrder: number,
  monsterId: MonsterId,
  lifeValue: number, // TODO
  acquiredSkills: AcquiredSkill[] // TODO
}): Battler {
  const monsterData = loadMonsterData(data.monsterId)
  return {
    monsterData,
    id: Symbol('enemy'),
    side: 'enemy',
    formationOrder: data.formationOrder,
    controllable: false,
    displayName: monsterData.displayName,
    life: { val: data.lifeValue, max: data.lifeValue },
    skills: data.acquiredSkills.map(as => buildBattlerSkill(as.skillId, as.lv))
  }
}

export function buildEnemyBattlers(
  enemies: {
    monsterId: MonsterId,
    lifeValue: number,
    acquiredSkills: AcquiredSkill[]
  }[]
): Battler[] {
  return enemies.map((actor, index) => {
    return buildEnemyBattler({
      ...actor,
      formationOrder: index,
      lifeValue: actor.lifeValue
    })
  })
}

export const battleStateMock0: BattleState = Object.freeze({
  turn: 0,
  inputQueue: [],
  battlers: buildAllyBattlers([
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
    buildEnemyBattlers([
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
