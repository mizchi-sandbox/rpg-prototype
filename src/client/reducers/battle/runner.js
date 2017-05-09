/* @flow */
import {
  PAUSED,
  REQUEST_START,
  RESET,
  RESTARTED,
  UPDATE_INPUT_QUEUE,
  MOVE_SKILL_SELECTOR,
  SET_SKILL_SELECTOR,
  UNSET_SKILL_SELECTOR,
  OPEN_RESULT,
  CLOSE_RESULT
} from '../../actions/battleActions'
import type { BattleSagaAction } from '../../actions/battleSagaActions'
import { SYNC } from '../../actions/battleSagaActions'
import type { BattleAction } from '../../actions/battleActions'
import type {
  BattleSession,
  Input,
  BattleSessionResult,
  Battler
} from 'domain/battle'

// State
export type SkillSelector = {
  x: number,
  y: number
}
export type State = {
  battleState: ?BattleSession,
  inputQueue: Input[],
  loading: boolean,
  paused: boolean,
  skillSelectCursor: ?SkillSelector,
  battleCommandResult: ?BattleSessionResult
}

const initialState: State = {
  loading: true,
  paused: false,
  battleState: null,
  inputQueue: [],
  skillSelectCursor: { x: 0, y: 0 },
  battleCommandResult: null
}

// Reducer
export default (
  session: State = initialState,
  action: BattleAction | BattleSagaAction
) => {
  switch (action.type) {
    case REQUEST_START:
      return {
        ...session,
        battleState: null,
        loading: false
      }
    case PAUSED:
      return {
        ...session,
        paused: true
      }
    case RESTARTED:
      return {
        ...session,
        paused: false
      }
    case SYNC:
      return {
        ...session,
        battleState: action.payload,
        loading: true
      }
    case OPEN_RESULT:
      return {
        ...session,
        battleCommandResult: action.payload
      }
    case CLOSE_RESULT:
      return {
        ...session,
        battleCommandResult: null
      }
    case UPDATE_INPUT_QUEUE:
      return {
        ...session,
        inputQueue: action.payload.inputQueue
      }
    case SET_SKILL_SELECTOR:
      return {
        ...session,
        skillSelectCursor: action.payload
      }
    case UNSET_SKILL_SELECTOR:
      return {
        ...session,
        skillSelectCursor: null
      }
    case MOVE_SKILL_SELECTOR:
      if (session.skillSelectCursor && session.battleState) {
        const { skillSelectCursor, battleState } = session
        const allies = battleState.battlers.filter(b => b.side === 'ally')
        const { x, y } = skillSelectCursor
        const { dx, dy } = action.payload
        return {
          ...session,
          skillSelectCursor: moveSkillCursorWithOverflow(allies, x + dx, y + dy)
        }
      } else {
        return {
          ...session,
          skillSelectCursor: { x: 0, y: 0 }
        }
      }
    case RESET:
      return initialState
    default:
      return session
  }
}

const { abs } = Math
function moveSkillCursorWithOverflow(
  battlers: Battler[],
  x: number,
  y: number
): { x: number, y: number } {
  // select battler as y axis
  const my = battlers.length
  let ry = y < my ? y : abs(y % my)
  ry = ry < 0 ? my - 1 : ry
  const b = battlers[ry]

  // select skill as x axis
  const mx = b.skills.length
  let rx = x < mx ? x : abs(x % mx)
  rx = rx < 0 ? mx - 1 : rx
  console.log(x, y, rx, ry)
  return {
    x: rx,
    y: ry
  }
}
