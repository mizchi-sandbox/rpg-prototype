/* @flow */

import * as InputActions from './events/input'
import * as OutputActions from './events/output'
import type { Input } from './events/input'
import type { Output } from './events/output'

export type Battler = {
  name: string,
  count: number,
  life: number
}

// State
export type BattleState = {
  allies: Battler[],
  enemies: Battler[],
  turn: number
}

type Result = {
  win: boolean
}

export default function * mainloop (
  state: BattleState
): Generator<Output, Result, Input> {
  let input: Input = yield OutputActions.readyMainloop()

  if (input.type !== InputActions.INIT_MAINLOOP) {
    throw new Error('mainloop:handshake-failed')
  }
  let isExit = false
  while (!isExit) {
    switch (input.type) {
      case InputActions.PROCESS_TURN:
        input = yield {
          type: OutputActions.LOG,
          payload: {
            text: 'ready!'
          }
        }
      default:
        isExit = true
    }

    if (isExit) {
      break
    }
  }

  return {
    win: true
  }
}

// const ml = mainloop()
// let displayEvent = ml.next({type: 'init'})
// while (true) {
//   displayEvent = ml.next({
//     type: 'add',
//     payload: {
//       val: 1
//     }
//   })
//   if (displayEvent.done) {
//     console.log(displayEvent)
//     break
//   }
// }
// console.log('done')
