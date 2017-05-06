/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import BattleScene from '../BattleScene'
import { createBattleMock } from 'domain/battle/BattleState'

storiesOf('BattleScene', module)
  .add('Loading', () => {
    return (
      <BattleScene
        log={[]}
        runner={{
          battleState: null,
          inputQueue: [],
          loading: true,
          paused: false
        }}
        dispatch={() => {
          action('clicked')
        }}
      />
    )
  })
  .add('Show', () => {
    return (
      <BattleScene
        log={[]}
        runner={{
          battleState: createBattleMock(),
          inputQueue: [],
          loading: false,
          paused: true
        }}
        dispatch={() => {
          action('clicked')
        }}
      />
    )
  })
