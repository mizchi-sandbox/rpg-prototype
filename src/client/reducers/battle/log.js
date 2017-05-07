/* @flow */
import { LOG, RESET } from '../../actions/battleActions'
import type { BattleAction } from '../../actions/battleActions'

// State
export type State = string[]

// Reducer
export default (log: State = [], action: BattleAction) => {
  switch (action.type) {
    case LOG:
      return log.length < 10
        ? [].concat([action.payload], log)
        : [].concat([action.payload], log.slice(0, -1))
    case RESET:
      return []
    default:
      return log
  }
}
