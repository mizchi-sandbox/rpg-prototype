/* @flow */
import type { AdventureSession } from 'domain/entities/AdventureSession'
import type { Input, BattleSessionResult } from 'domain/battle'
import { createNoTargetedSkillInput } from 'domain/battle'

// Constants
export const REQUEST_START = 'battle:request-start'
export const REQUEST_PAUSE = 'battle:request-pause'
export const REQUEST_RESTART = 'battle:request-restart'
export const PAUSED = 'battle:paused'
export const RESTARTED = 'battle:restarted'
export const OPEN_BATTLE_SESSION_RESULT = 'battle:open-battle-session-result'
export const EXIT_BATTLE_SESSION = 'battle:exit-battle-session'
export const ADD_INPUT_TO_QUEUE = 'battle:add-input-to-queue'
export const UPDATE_INPUT_QUEUE = 'battle:update-input-queue'
export const MOVE_SKILL_SELECTOR = 'battle:move-skill-selector'
export const SET_SKILL_SELECTOR = 'battle:set-skill-selector'
export const UNSET_SKILL_SELECTOR = 'battle:unset-skill-selector'
export const RESET = 'battle:reset'
export const LOG = 'battle:log'

// Actions
export type BattleAction =
  | {
      type: typeof REQUEST_START,
      payload: { adventureSession: AdventureSession }
    }
  | { type: typeof REQUEST_PAUSE }
  | { type: typeof REQUEST_RESTART }
  | { type: typeof PAUSED }
  | { type: typeof RESTARTED }
  | { type: typeof RESET }
  | { type: typeof MOVE_SKILL_SELECTOR, payload: { dx: number, dy: number } }
  | { type: typeof SET_SKILL_SELECTOR, payload: { x: number, y: number } }
  | { type: typeof UNSET_SKILL_SELECTOR }
  | {
      type: typeof OPEN_BATTLE_SESSION_RESULT,
      payload: BattleSessionResult
    }
  | {
      type: typeof EXIT_BATTLE_SESSION
    }
  | { type: typeof LOG, payload: string }
  | {
      type: typeof ADD_INPUT_TO_QUEUE,
      payload: {
        battlerId: Symbol,
        skillId: Symbol
      }
    }
  | {
      type: typeof UPDATE_INPUT_QUEUE,
      payload: {
        inputQueue: Input[]
      }
    }

// Action creator
export const requestStart = (adventureSession: AdventureSession) => ({
  type: REQUEST_START,
  payload: {
    adventureSession
  }
})
export const requestPause = () => ({ type: REQUEST_PAUSE })
export const requestRestart = () => ({ type: REQUEST_RESTART })
export const paused = () => ({ type: PAUSED })
export const restarted = () => ({ type: RESTARTED })
export const reset = () => ({ type: RESET })

// Skill Selector
export const moveSkillSelector = (dx: number, dy: number) => ({
  type: MOVE_SKILL_SELECTOR,
  payload: { dx, dy }
})
export const setSkillSelector = (x: number, y: number) => ({
  type: SET_SKILL_SELECTOR,
  payload: { x, y }
})
export const unsetSkillSelector = () => ({
  type: UNSET_SKILL_SELECTOR
})

export const openBattleSessionResult = (result: BattleSessionResult) => ({
  type: OPEN_BATTLE_SESSION_RESULT,
  payload: result
})
export const closeBattleSessionResult = () => ({ type: EXIT_BATTLE_SESSION })
export const log = (message: string) => ({ type: LOG, payload: message })
export const addInputToQueue = (battlerId: Symbol, skillId: Symbol) => {
  return {
    type: ADD_INPUT_TO_QUEUE,
    payload: createNoTargetedSkillInput(battlerId, skillId)
  }
}
export const updateInputQueue = (inputQueue: Input[]) => ({
  type: UPDATE_INPUT_QUEUE,
  payload: { inputQueue }
})
