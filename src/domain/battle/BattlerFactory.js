/* @flow */
import uuid from 'uuid'
import { loadMonsterData } from '../master'
import { buildSkill } from './Skill'
import type { Battler } from './Battler'
import type { MonsterId } from 'domain/master'
import type { Actor, AcquiredSkill } from 'domain/entities/Actor'

export function buildAllyBattler(data: {
  formationOrder: number,
  displayName: string,
  controllable: boolean,
  lifeValue: number,
  acquiredSkills: AcquiredSkill[]
}): Battler {
  return {
    id: uuid('ally'),
    side: 'ally',
    formationOrder: data.formationOrder,
    controllable: data.controllable,
    displayName: data.displayName,
    life: { val: data.lifeValue, max: data.lifeValue },
    skills: data.acquiredSkills.map(as => buildSkill(as.skillId, as.lv))
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
  monsterId: MonsterId
}): Battler {
  const monsterData = loadMonsterData(data.monsterId)
  return {
    monsterData,
    id: uuid('enemy'),
    side: 'enemy',
    formationOrder: data.formationOrder,
    controllable: false,
    displayName: monsterData.displayName,
    life: { val: monsterData.life, max: monsterData.life },
    skills: monsterData.skills.map(as => buildSkill((as.skillId: any), as.lv))
  }
}

export function buildEnemyBattlers(
  enemies: {
    monsterId: MonsterId
  }[]
): Battler[] {
  return enemies.map((enemy, index) => {
    return buildEnemyBattler({
      ...enemy,
      formationOrder: index
    })
  })
}
