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
  OPEN_BATTLE_SESSION_RESULT,
  EXIT_BATTLE_SESSION
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
  battleSession: ?BattleSession,
  inputQueue: Input[],
  loading: boolean,
  paused: boolean,
  skillSelectCursor: ?SkillSelector,
  battleSessionResult: ?BattleSessionResult
}

const initialState: State = Object.freeze({
  loading: true,
  paused: false,
  battleSession: null,
  inputQueue: [],
  skillSelectCursor: { x: 0, y: 0 },
  battleSessionResult: null
})

// Reducer
export default (
  state: State = initialState,
  action: BattleAction | BattleSagaAction
) => {
  switch (action.type) {
    case REQUEST_START:
      return {
        ...state,
        battleSession: null,
        loading: false
      }
    case PAUSED:
      return {
        ...state,
        paused: true
      }
    case RESTARTED:
      return {
        ...state,
        paused: false
      }
    case SYNC:
      return {
        ...state,
        battleSession: action.payload,
        loading: true
      }
    case OPEN_BATTLE_SESSION_RESULT:
      return {
        ...state,
        battleSessionResult: action.payload
      }
    case EXIT_BATTLE_SESSION:
      return initialState
    case UPDATE_INPUT_QUEUE:
      return {
        ...state,
        inputQueue: action.payload.inputQueue
      }
    case SET_SKILL_SELECTOR:
      return {
        ...state,
        skillSelectCursor: action.payload
      }
    case UNSET_SKILL_SELECTOR:
      return {
        ...state,
        skillSelectCursor: null
      }
    case MOVE_SKILL_SELECTOR:
      if (state.skillSelectCursor && state.battleSession) {
        const { skillSelectCursor, battleSession } = state
        const allies = battleSession.battlers.filter(b => b.side === 'ally')
        const { x, y } = skillSelectCursor
        const { dx, dy } = action.payload
        return {
          ...state,
          skillSelectCursor: moveSkillCursorWithOverflow(allies, x + dx, y + dy)
        }
      } else {
        return {
          ...state,
          skillSelectCursor: { x: 0, y: 0 }
        }
      }
    case RESET:
      return initialState
    default:
      return state
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
