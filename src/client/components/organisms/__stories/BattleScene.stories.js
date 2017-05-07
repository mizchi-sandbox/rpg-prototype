/* @flow */
import React from 'react'
import { action, storiesOf } from '@kadira/storybook'
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
          paused: false,
          battleCommandResult: null
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
          paused: true,
          battleCommandResult: null
        }}
        dispatch={() => {
          action('clicked')
        }}
      />
    )
  })
