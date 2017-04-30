/* @flow */
import type { Skill } from '../gen/types'
import type { ConsumableValue } from './values/ConsumableValue'

export type Battler = {
  name: string,
  ap: ConsumableValue,
  life: number,
  skills: Skill[]
}
