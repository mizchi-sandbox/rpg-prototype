/* @flow */
import test from 'ava'
import { INIT_MAINLOOP, PROCESS_TURN } from '../events/input'
import { READY_MAINLOOP } from '../events/output'
import mainloop from '../mainloop'

const initialState = {
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
test('init mainloop', t => {
  const ml = mainloop(initialState)
  const ret1 = ml.next({
    type: INIT_MAINLOOP
  })

  if (!ret1.done) {
    t.is(ret1.value.type, READY_MAINLOOP)
  } else {
    t.fail()
  }

  const ret2 = ml.next({
    type: PROCESS_TURN
  })
  if (!ret2.done) {
    t.is(ret2.value.type, READY_MAINLOOP)
  } else {
    t.fail()
  }
})
