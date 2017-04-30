/* @flow */

// Actions
export const RESET = 'battle:reset'
export const PROCESS_TURN_START = 'battle:process-turn:start'
export const PROCESS_TURN_END = 'battle:process-turn:end'

export type ResetAction = {
  type: typeof RESET
}

export type ProcessTurnStartAction = {
  type: typeof PROCESS_TURN_START
}

export type ProcessTurnEndAction = {
  type: typeof PROCESS_TURN_END
}

export type Action =
  | ResetAction
  | ProcessTurnStartAction
  | ProcessTurnEndAction

type ConsumableValue = {
  val: number,
  max: number
}

export const processTurnStart = (): ProcessTurnStartAction => {
  return {
    type: PROCESS_TURN_START
  }
}

export type Skill = {
  skillId: number,
  displayName: string,
  actionCost: number,
  type: 'auto' | 'exec'
}

export type Battler = {
  name: string,
  ap: ConsumableValue,
  life: number,
  skills: Skill[]
}

// State
export type State = {
  allies: Battler[],
  enemies: Battler[],
  turn: number
}

export type BattleState = State

const initialState: BattleState = {
  allies: [
    {
      name: 'mizchi',
      life: 50,
      ap: { val: 0, max: 15 },
      skills: [
        {
          skillId: 0,
          displayName: 'Attack',
          actionCost: 5,
          type: 'exec'
        },
        {
          skillId: 1,
          displayName: 'PowerAttack',
          actionCost: 9,
          type: 'exec'
        }
      ]

    }
  ],
  enemies: [
    {
      name: 'goblin',
      life: 15,
      ap: { val: 0, max: 10 },
      skills: [
        {
          skillId: 0,
          displayName: 'Attack',
          actionCost: 8,
          type: 'auto'
        }
      ]
    }
  ],
  turn: 0
}

// domain code
function processButtler (battler: Battler): Battler {
  return {
    ...battler,
    ap: {
      ...battler.ap,
      val: Math.min(
        battler.ap.val + 1,
        battler.ap.max
      )
    }
  }
}

function processTurn (s: State): State {
  const allies = s.allies.map(processButtler)
  const enemies = s.enemies.map(processButtler)
  return { turn: s.turn + 1, allies, enemies }
}

// Reducer
export default (
  state: State = initialState,
  action: Action
) => {
  switch (action.type) {
    case PROCESS_TURN_END:
      return processTurn(state)
    case RESET:
      return initialState
    default:
      return state
  }
}
