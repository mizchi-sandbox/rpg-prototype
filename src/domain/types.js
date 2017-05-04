/* @flow */
import type { Skill } from './master/types'
import type { ConsumableValue } from './values/ConsumableValue'

export type Battler = {
  side: 'ally' | 'enemy',
  formationOrder: 0 | 1 | 2 | 3 | 4,
  id: string,
  name: string,
  ap: ConsumableValue,
  life: ConsumableValue,
  skills: Skill[]
}

export * from './master/types'
