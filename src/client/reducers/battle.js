/* @flow */

// Actions
export const RESET = 'battle:reset'
export const PROCESS_TURN_START = 'battle:process-turn:start'
export const PROCESS_TURN_END = 'battle:process-turn:end'

export type Action =
  | {
    type: typeof RESET
  }
  | {
    type: typeof PROCESS_TURN_START
  }
  | {
    type: typeof PROCESS_TURN_END
  }

export type Battler = {
  name: string,
  count: number,
  life: number
}

export const processTurnStart = () => {
  return {
    type: PROCESS_TURN_START
  }
}

// State
export type State = {
  allies: Battler[],
  enemies: Battler[],
  turn: number
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
  turn: 0
}

function processTurn (s: State) {
  const allies = s.allies.map(ally => ({
    ...ally,
    count: ally.count + 1
  }))
  const enemies = s.enemies.map(enemy => ({
    ...enemy,
    count: enemy.count + 1
  }))
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
