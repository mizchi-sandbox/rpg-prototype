/* @flow */
import type { Skill } from '../gen/types'
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
