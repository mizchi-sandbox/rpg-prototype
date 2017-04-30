/* @flow */

// Actions
export const RESET = 'battle:reset'
export const STEP_TO_NEXT_TURN = 'battle:step-to-next-turn'

export type Action =
  | {
    type: typeof RESET
  }
  | {
    type: typeof STEP_TO_NEXT_TURN
  }

export type Battler = {
  name: string,
  count: number,
  life: number
}

export const stepToNextTurn = () => {
  return {
    type: STEP_TO_NEXT_TURN
  }
}

// State
export type State = {
  allies: Battler[],
  enemies: Battler[],
  count: number
}

const initialState: State = {
  allies: [
    {
      name: 'mizchi', count: 0, life: 50
    }
  ],
  enemies: [
    {
      name: 'goblin', count: 0, life: 15
    }
  ],
  count: 0
}

// Reducer
export default (
  state: State = initialState,
  action: Action
) => {
  switch(action.type) {
    case RESET:
      return initialState
    default:
      return state
  }
}
